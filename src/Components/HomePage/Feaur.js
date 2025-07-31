import React, { useState, useEffect } from "react";
import { PRODUCTS } from "../../config/api.config";

const FeatureProducts = ({ navigateShop }) => {
  const [products, setProducts] = useState([]);

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(PRODUCTS.FEATURED);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data is an array before setting it
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching feature products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Base URL for images
  const baseUrl = process.env.PUBLIC_URL || '';
  
  // Fallback images from the public directory with absolute paths
  const fallbackBanner = `${baseUrl}/sla.jpg`;
  const fallbackIcon = `${baseUrl}/Category/icon.png`;
  const fallbackProductImages = [
    `${baseUrl}/Category/1.png`,
    `${baseUrl}/Category/2.png`,
    `${baseUrl}/Category/3.png`,
    `${baseUrl}/Category/4.png`,
    `${baseUrl}/Category/5.png`,
    `${baseUrl}/Category/6.png`
  ];
  
  // Function to ensure image URLs are properly formatted with base URL
  const getImageUrl = (url) => {
    if (!url) return fallbackProductImages[0];
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Function to handle image errors with multiple fallbacks
  const handleImageError = (e, index = 0) => {
    console.log('Image failed to load:', e.target.src);
    const fallback = fallbackProductImages[index % fallbackProductImages.length];
    console.log('Trying fallback:', fallback);
    
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    } else if (fallbackProductImages.length > 0) {
      // Try next fallback image
      const nextIndex = (index + 1) % fallbackProductImages.length;
      console.log('Trying next fallback:', fallbackProductImages[nextIndex]);
      e.target.src = fallbackProductImages[nextIndex];
    } else {
      console.error('All fallback images failed to load');
      e.target.style.display = 'none';
    }
  };

  return (
    <div className="container mx-auto py-10 px-2">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img 
            src={fallbackIcon} 
            alt="Diamond Icon" 
            className="w-6 h-6"
            onError={(e) => {
              console.log('Icon failed to load, hiding...');
              e.target.style.display = 'none';
            }}
          />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>
        <h2 className="text-3xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
          Feature Products
        </h2>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* Left Banner */}
        <div className="lg:w-1/4">
          <div className="relative bg-black h-full">
            <img
              src={fallbackBanner}
              alt="New Collection"
              className="w-full h-64 lg:h-full object-cover opacity-50"
              onError={(e) => {
                console.log('Banner image failed to load, trying fallback...');
                e.target.src = `${baseUrl}/banner.png`;
              }}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Array.isArray(products) ? products : [])
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((product) => {
                // Ensure product is an object and has required properties
                if (!product || typeof product !== 'object') return null;
                
                const productId = product._id || Math.random().toString();
                const productIndex = Math.floor(Math.random() * fallbackProductImages.length);
                const imageUrl = getImageUrl(product.image) || fallbackProductImages[productIndex];
                const productName = product.name || product.title || 'Product Name';
                const description = product.description || '';
                
                return (
                  <div
                    onClick={shopNavigationHandler}
                    key={productId}
                    className="rounded-xl shadow transition duration-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="flex-1 relative bg-white flex items-center justify-center h-48">
                      <img
                        src={imageUrl}
                        alt={productName}
                        className="max-w-full max-h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          handleImageError(e, productIndex);
                        }}
                        loading="lazy"
                      />
                    </div>
                    {/* Name & Optional Description */}
                    <div className="text-center py-3 px-2 flex-shrink-0">
                      <h3 className="font-Brown uppercase text-sm text-gray-800">
                        {productName}
                      </h3>
                      {description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
