import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductService from "../../../api/productService";
import axios from "axios";
import { CATEGORIES, OTHER, WS_CONFIG } from "../../../config/api.config";

// Image Gallery Modal Component
const ImageGalleryModal = ({ isOpen, onClose, images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
        >
          ✕
        </button>
        
        <div className="relative h-[70vh]">
          <img
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ❮
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ❯
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [caratPrices, setCaratPrices] = useState({});
  const [calculatedPrices, setCalculatedPrices] = useState({});
  const [wsStatus, setWsStatus] = useState("Initializing...");
  const [usePolling, setUsePolling] = useState(false);
  const socketRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const navigate = useNavigate();

  // Favorites state
  const [favorites, setFavorites] = useState(new Set());
  
  // State for image gallery
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    productName: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Filter states
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCarat, setSelectedCarat] = useState("all");
  
  // Open gallery with product images
  const openGallery = useCallback((product) => {
    const images = [
      ...(product.coverImage ? [product.coverImage] : []),
      ...(product.images || [])
    ].filter(Boolean);
    
    if (images.length > 0) {
      setGalleryState({
        isOpen: true,
        images,
        currentIndex: 0,
        productName: product.name
      });
    }
  }, []);
  
  // Close gallery
  const closeGallery = useCallback(() => {
    setGalleryState(prev => ({ ...prev, isOpen: false }));
  }, []);
  
  // Navigate gallery images
  const navigateGallery = useCallback((direction) => {
    setGalleryState(prev => {
      if (direction === 'next') {
        const newIndex = (prev.currentIndex + 1) % prev.images.length;
        return { ...prev, currentIndex: newIndex };
      } else {
        const newIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
        return { ...prev, currentIndex: newIndex };
      }
    });
  }, []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Replace the existing favorites loading useEffect with this:
  useEffect(() => {
    // First try to load from API, fallback to localStorage
    const loadFavorites = async () => {
      try {
        await fetchUserWishlist();
      } catch (error) {
        // Fallback to localStorage if API fails
        const savedFavorites = localStorage.getItem("jewelryFavorites");
        if (savedFavorites) {
          try {
            const favoritesArray = JSON.parse(savedFavorites);
            setFavorites(new Set(favoritesArray));
          } catch (error) {
            console.error("Error loading favorites from localStorage:", error);
          }
        }
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem("jewelryFavorites", JSON.stringify([...favorites]));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  // Toggle favorite status
  // Replace your existing toggleFavorite function with this:
  const toggleFavorite = async (productId, event) => {
    // Prevent card click event from firing
    event.stopPropagation();

    try {
      const isFavorited = favorites.has(productId);

      if (isFavorited) {
        // Remove from wishlist
        await removeFromWishlist(productId);
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(productId);
          return newFavorites;
        });
      } else {
        // Add to wishlist
        await addToWishlist(productId);
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.add(productId);
          return newFavorites;
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Show error message to user (you can add a toast notification here)
      alert("Failed to update wishlist. Please try again.");
    }
  };
  // Memoize the price calculation function
  const calculateProductPrices = useCallback((productsList, prices) => {
    console.log("Calculating prices with gold prices:", prices);
    if (!Object.keys(prices).length || !productsList.length) return;

    const newPrices = {};
    productsList.forEach((product) => {
      try {
        // Use consistent property names
        const netWeight = product.netWeight || 0;
        const carat = product.carat || "";
        const makingCharge = parseFloat(product.makingcharge) || 0;

        if (netWeight && carat && !isNaN(netWeight)) {
          const caratKey = carat.toUpperCase();
          const goldPricePerGram = parseFloat(prices[caratKey]);

          // Make sure we have a valid gold price
          if (!goldPricePerGram || isNaN(goldPricePerGram)) {
            console.warn(
              `Invalid gold price for ${caratKey}:`,
              prices[caratKey]
            );
            return;
          }

          // Calculate gold price based on weight and current rate
          const goldPrice = netWeight * goldPricePerGram;

          // Calculate making charge amount (as percentage of gold price)
          const makingChargeAmount = (goldPrice * makingCharge) / 100;

          // Calculate total price
          const totalPrice = goldPrice + makingChargeAmount;

          // Store the calculated price with detailed breakdown for debugging
          newPrices[product._id] = {
            total: totalPrice.toFixed(2),
            breakdown: {
              goldPrice: goldPrice.toFixed(2),
              makingChargeAmount: makingChargeAmount.toFixed(2),
              netWeight,
              pricePerGram: goldPricePerGram,
              makingChargePercentage: makingCharge,
            },
          };

          console.log(
            `Price calculated for ${product.name}: ₹${totalPrice.toFixed(2)}`
          );
        } else {
          console.warn("Missing required product data for price calculation:", {
            netWeight,
            carat,
            makingCharge,
            productId: product._id,
          });
        }
      } catch (err) {
        console.error("Error calculating price for product:", product._id, err);
      }
    });

    console.log("New calculated prices:", newPrices);
    setCalculatedPrices(newPrices);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      console.log('Starting to fetch products...');
      setIsLoading(true);
      setError(null);
      
      // Use the product service to fetch products with any category filter
      const params = {};
      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory;
        console.log('Fetching products for category:', selectedCategory);
      } else {
        console.log('Fetching all products');
      }
      
      console.log('Calling ProductService.getProducts with params:', params);
      const productsData = await ProductService.getProducts(params);
      console.log('Received products data:', productsData);
      
      // Ensure we have a valid array of products
      const validProducts = Array.isArray(productsData) ? productsData : [];
      console.log('Processed valid products:', validProducts);
      
      setProducts(validProducts);
      setFilteredProducts(validProducts);
      
      // If no products found, show a message
      if (validProducts.length === 0) {
        console.log('No products found for the current filter');
        setError('No products available in this category. Please check back later.');
      } else {
        console.log(`Found ${validProducts.length} products`);
      }
      
      return validProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // If we have cached data, keep showing it
      if (products.length > 0) {
        setError('Showing cached data. ' + (error.message || 'Unable to fetch latest products.'));
      } else {
        let errorMsg = 'Failed to load products. ';
        
        if (error.response) {
          // Server responded with error status code
          if (error.response.status === 401) {
            errorMsg = 'Your session has expired. Please login again.';
            // Optionally redirect to login
            // navigate('/login');
          } else if (error.response.status === 403) {
            errorMsg = 'You do not have permission to view this content.';
          } else if (error.response.status === 404) {
            errorMsg = 'The requested resource was not found.';
          } else if (error.response.status >= 500) {
            errorMsg = 'Server error. Please try again later.';
          } else {
            errorMsg = `Error: ${error.response.status} - ${error.response.statusText}`;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMsg = 'No response from server. Please check your internet connection.';
        } else {
          // Something happened in setting up the request
          errorMsg = `Error: ${error.message}`;
        }
        
        setError(errorMsg);
      }
      
      return [];
    } finally {
      setIsLoading(false);
    }

  }, [selectedCategory, products, navigate]);

  // Function to validate gold price
  const validateGoldPrice = useCallback((prices, caratKey) => {
    if (!prices || !caratKey) return false;
    
    const goldPricePerGram = prices[caratKey];
    if (!goldPricePerGram || isNaN(goldPricePerGram)) {
      console.warn(
        `Invalid gold price for ${caratKey}:`,
        prices[caratKey]
      );
      return false;
    }
    return true;
  }, []);

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      // Use the full URL from the config
      const response = await axios.get(CATEGORIES.ALL);
      console.log('Categories API response:', response);
      
      if (response.data && Array.isArray(response.data)) {
        setCategories([{ _id: 'all', name: 'All Categories' }, ...response.data]);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Handle case where categories are nested in data property
        setCategories([{ _id: 'all', name: 'All Categories' }, ...response.data.data]);
      } else {
        console.warn('Unexpected categories format:', response.data);
        setCategories([{ _id: 'all', name: 'All Categories' }]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      console.error('Error details:', error.response?.data || error.message);
      setError('Failed to load categories. Using default categories.');
      setCategories([{ _id: 'all', name: 'All Categories' }]);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  // Initial categories fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchGoldPrices = async () => {
    try {
      const response = await axios.get(OTHER.GOLD_PRICE);
      console.log("Fetched gold prices:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Convert array to object with Carat as key and TodayPricePerGram as value
        const prices = {};
        response.data.forEach((item) => {
          prices[item.Carat] = item.TodayPricePerGram;
        });

        setCaratPrices(prices);
        return prices;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch gold prices:", err);
      return null;
    }
  };

  // Apply filters when filter selections change
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === selectedCategory || product.category === selectedCategory
      );
      console.log('Filtered products by category:', selectedCategory, 'Count:', filtered.length);
    }

    // Apply carat filter
    if (selectedCarat !== "all") {
      filtered = filtered.filter((product) => {
        const productCarat = (product.carat || "").toUpperCase();
        return productCarat === selectedCarat;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedCarat, products]);

  // Setup polling as a fallback for WebSocket
  const setupPolling = useCallback(() => {
    console.log("Setting up polling for gold price updates");
    setUsePolling(true);
    setWsStatus("Using polling (30s interval)");

    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Fetch immediately and then set up interval
    fetchGoldPrices();

    pollingIntervalRef.current = setInterval(async () => {
      console.log("Polling for gold price update");
      await fetchGoldPrices();
    }, 30000); // Poll every 30 seconds

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Set up WebSocket with fallback to polling
  const setupWebSocket = useCallback(() => {
    // If we're already using polling, don't try WebSocket again
    if (usePolling) {
      return setupPolling();
    }

    // const wsUrl = "wss://backend.srilaxmialankar.com/ws/goldprice";
    const wsUrl = WS_CONFIG.GOLD_PRICE;

    console.log("Attempting to set up WebSocket connection");
    setWsStatus("Connecting...");

    try {
      // Close existing connection if any
      if (socketRef.current) {
        socketRef.current.close();
      }

      // Create new WebSocket connection
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      let connectionTimeout = setTimeout(() => {
        console.log("WebSocket connection timed out");
        socket.close();
        setupPolling();
      }, 5000);

      socket.onopen = () => {
        console.log("WebSocket connected successfully");
        clearTimeout(connectionTimeout);
        setWsStatus("Connected (real-time)");
        setUsePolling(false);
      };

      socket.onmessage = async (event) => {
        try {
          console.log("WebSocket message received:", event.data);
          const data = JSON.parse(event.data);

          // If we receive a price update notification, fetch the latest prices
          if (data && data.type === "PRICE_UPDATE") {
            await fetchGoldPrices();
          }
        } catch (err) {
          console.error("Error processing WebSocket message:", err);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        clearTimeout(connectionTimeout);
        setWsStatus("Connection failed, switching to polling");
        setupPolling();
      };

      socket.onclose = (event) => {
        console.log("WebSocket closed, code:", event.code);
        if (!usePolling) {
          // Only try to reconnect if we haven't switched to polling
          setWsStatus("Disconnected, attempting to reconnect...");
          setTimeout(() => setupWebSocket(), 5000);
        }
      };

      return () => {
        clearTimeout(connectionTimeout);
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      setupPolling();
      return () => {};
    }
  }, [setupPolling, usePolling]);

  // Initial setup on component mount
  useEffect(() => {
    console.log("Component mounted, initializing...");

    const initializeData = async () => {
      // Fetch data in parallel
      await Promise.all([
        fetchGoldPrices(),
        fetchProducts(),
        fetchCategories(),
      ]);

      // Calculate prices if all data is loaded
      if (Object.keys(caratPrices).length > 0 && products.length > 0) {
        calculateProductPrices(products, caratPrices);
      }
    };

    initializeData();
    const cleanup = setupWebSocket();

    return () => {
      console.log("Component unmounting, cleaning up...");
      if (typeof cleanup === "function") {
        cleanup();
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [setupWebSocket]);

  // Recalculate prices when gold prices or products change
  useEffect(() => {
    if (Object.keys(caratPrices).length > 0 && products.length > 0) {
      calculateProductPrices(products, caratPrices);
    }
  }, [caratPrices, products, calculateProductPrices]);

  // Manual refresh button handler
  const handleManualRefresh = async () => {
    await fetchGoldPrices();
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedCarat("all");
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get list of carats from API data
  const caratList = Object.keys(caratPrices).sort((a, b) => {
    // Sort by carat value (extract number from string like "24K")
    const caratA = parseInt(a.replace(/\D/g, ""));
    const caratB = parseInt(b.replace(/\D/g, ""));
    return caratB - caratA; // Sort highest to lowest
  });

  // Get unique carats from products
  const uniqueCarats = [
    ...new Set(products.map((product) => (product.carat || "").toUpperCase())),
  ].filter(Boolean);

  const addToWishlist = async (productId) => {
    try {
      const userId = "67f80c0de5b37dc266e25746";
      const response = await axios.post(
        "https://backend.srilaxmialankar.com/wishlist/wishlist",
        { productId, userId },
        {
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      // Assuming you have a DELETE endpoint
      const response = await axios.delete(
        `http://localhost:8000/wishlist/wishlist/${productId}`, // TODO: Update to use WISHLIST.USER
        {
          headers: {
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  const fetchUserWishlist = async () => {
    try {
      const response = await axios.get(
        "https://backend.srilaxmialankar.com/wishlist/wishlist",
        {
          headers: {
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          },
        }
      );

      if (response.data && response.data.items) {
        const wishlistProductIds = response.data.items.map(
          (item) => item.productId
        );
        setFavorites(new Set(wishlistProductIds));
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-yellow-700">
            Jewellery Products
          </h1>
          {favorites.size > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1">
              <span className="text-sm text-red-700 font-medium">
                ❤️ {favorites.size} favorited
              </span>
            </div>
          )}
        </div>
        {Object.keys(caratPrices).length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 w-full lg:w-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-yellow-800">
                Today's Gold Prices
              </span>
              <div className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    wsStatus.includes("Connected")
                      ? "bg-green-500"
                      : wsStatus.includes("polling")
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="text-xs text-yellow-600 ml-2">{wsStatus}</span>
              </div>
            </div>

            {/* Carat-wise price grid */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              {caratList.map((carat) => (
                <div
                  key={carat}
                  className="bg-yellow-50 p-2 rounded border border-yellow-200"
                >
                  <div className="text-xs text-yellow-800">{carat}</div>
                  <div className="text-lg font-bold text-yellow-700">
                    ₹{parseFloat(caratPrices[carat]).toLocaleString()}/g
                  </div>
                </div>
              ))}
              {/* Add placeholder if we have odd number of carats */}
              {caratList.length % 2 !== 0 && (
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 opacity-0"></div>
              )}
            </div>

            <div className="flex justify-end mt-1">
              <button
                onClick={handleManualRefresh}
                className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Refresh Prices
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main content with sidebar layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar for filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Filter Products
            </h2>

            {/* Category filter */}
            <div className="mb-4">
              <label
                htmlFor="categoryFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                disabled={categoriesLoading}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={category._id || index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categoriesLoading && (
                <p className="text-xs text-gray-500 mt-1">
                  Loading categories...
                </p>
              )}
            </div>

            {/* Carat filter */}
            <div className="mb-4">
              <label
                htmlFor="caratFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Carat
              </label>
              <select
                id="caratFilter"
                value={selectedCarat}
                onChange={(e) => setSelectedCarat(e.target.value)}
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="all">All Carats</option>
                {uniqueCarats.map((carat, index) => (
                  <option key={index} value={carat}>
                    {carat}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear filters button */}
            <div className="mt-6">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>

            {/* Filter status */}
            {(selectedCategory !== "all" || selectedCarat !== "all") && (
              <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
                <p className="font-medium mb-1">Active Filters:</p>
                {selectedCategory !== "all" && (
                  <p>
                    Category:{" "}
                    <span className="font-bold">{selectedCategory}</span>
                  </p>
                )}
                {selectedCarat !== "all" && (
                  <p>
                    Carat: <span className="font-bold">{selectedCarat}</span>
                  </p>
                )}
                <p className="mt-1">
                  Showing{" "}
                  <span className="font-bold">{filteredProducts.length}</span>{" "}
                  products
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side for product listing */}
        <div className="lg:w-3/4">
          {isLoading && <p className="text-center py-4">Loading products...</p>}
          {error && <p className="text-red-500 text-center py-4">{error}</p>}
          {!isLoading && filteredProducts.length === 0 && (
            <p className="text-center py-4">
              No products found matching your filters.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="bg-white p-3 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:scale-[1.02] hover:shadow-lg relative cursor-pointer"
              >
                {/* Favorite button */}
                <button
                  onClick={(e) => toggleFavorite(product._id, e)}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    favorites.has(product._id)
                      ? "bg-red-500 text-white shadow-lg scale-110"
                      : "bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500 shadow-md backdrop-blur-sm"
                  }`}
                  title={
                    favorites.has(product._id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill={favorites.has(product._id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={favorites.has(product._id) ? 0 : 2}
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    />
                  </svg>
                </button>

                <div 
                  className="relative group cursor-pointer"
                  onClick={() => openGallery(product)}
                >
                  {/* Main Image */}
                  <img
                    src={
                      product.images?.[0] ||
                      product.coverImage ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3 transition-all duration-300 hover:opacity-90"
                  />
                  
                  {/* Image Gallery Indicator */}
                  {(product.images?.length > 1 || (product.coverImage && product.images?.length > 0)) && (
                    <div className="absolute bottom-4 right-2">
                      <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        +{product.images?.length || 0} {product.images?.length === 1 ? 'image' : 'images'}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <span className="text-white bg-black bg-opacity-70 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <h2 className="text-lg font-semibold uppercase text-yellow-700 truncate">
                  {product.name}
                </h2>
                <p className="text-xs text-yellow-600 mb-1 font-bold uppercase">
                  {product.category}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2 h-[2.5rem]">
                  {product.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1 text-xs">
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 font-medium rounded">
                    {product.carat || product.karat || "N/A"}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 font-bold uppercase rounded">
                    Net: {product.netWeight || product.weight || "N/A"}g
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 font-bold uppercase rounded">
                    Gross: {product.grossWeight || product.weight || "N/A"}g
                  </span>
                </div>
                {calculatedPrices[product._id] ? (
                  <div className="mt-2 py-1 border-t text-sm">
                    <span className="text-gray-600">Current Price: </span>
                    <span className="font-bold text-yellow-700">
                      ₹
                      {parseFloat(
                        calculatedPrices[product._id].total
                      ).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  product.price && (
                    <div className="mt-2 py-1 border-t text-sm">
                      <span className="text-gray-600">Price: </span>
                      <span className="font-bold text-yellow-700">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.discountedPrice && (
                        <p className="text-xs text-green-600 mt-0.5">
                          Discounted: ₹
                          {product.discountedPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>

          {/* Pagination with dropdown */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 rounded border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  } text-sm font-medium`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="inline-block">
                  <select
                    value={currentPage}
                    onChange={(e) => paginate(Number(e.target.value))}
                    className="rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {Array.from({
                      length: Math.ceil(
                        filteredProducts.length / productsPerPage
                      ),
                    }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        Page {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                  }
                  className={`relative inline-flex items-center px-3 py-2 rounded border ${
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  } text-sm font-medium`}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProductsPage;
