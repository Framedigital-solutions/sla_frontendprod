import React, { useState, useEffect } from "react";
import { PRODUCTS } from "../../config/api.config";
import axios from "axios";

const ProductSelling = ({ navigateShop }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fallback images from the public directory
  const fallbackImages = [
    '/Category/1.png',
    '/Category/2.png',
    '/Category/3.png',
    '/Category/4.png',
    '/Category/5.png',
    '/Category/6.png'
  ];
  
  // Function to handle image errors
  const handleImageError = (e, index = 0) => {
    if (fallbackImages[index]) {
      e.target.src = fallbackImages[index];
    } else {
      e.target.style.display = 'none';
    }
  };

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchBestSelling = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(PRODUCTS.BEST_SELLING, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        timeout: 10000 // 10 second timeout
      });

      // Handle different response formats
      let productsData = [];
      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        productsData = response.data.products;
      } else if (response.data && response.data.data) {
        productsData = response.data.data;
      } else {
        console.warn('Unexpected API response format:', response.data);
        throw new Error('Unexpected API response format');
      }

      console.log("Best selling data:", productsData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching best selling products:", error);
      setError("Unable to load best selling products. Please try again later.");
      setProducts([]);
      
      // Fallback to sample data for demo purposes
      setProducts([
        {
          _id: 'best-1',
          name: 'Gold Necklace',
          price: 24999,
          image: fallbackImages[0],
          description: 'Elegant gold necklace for any occasion'
        },
        {
          _id: 'best-2',
          name: 'Diamond Ring',
          price: 34999,
          image: fallbackImages[1],
          description: 'Stunning diamond ring for special moments'
        },
        {
          _id: 'best-3',
          name: 'Pearl Set',
          price: 19999,
          image: fallbackImages[2],
          description: 'Classic pearl jewelry set'
        },
        {
          _id: 'best-4',
          name: 'Gold Bangle',
          price: 17999,
          image: fallbackImages[3],
          description: 'Traditional gold bangle'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSelling();
  }, []);

  return (
    <div className="container mx-auto px-2 py-20">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px"></div>
          <img
            src="/Category/icon.png"
            alt="Diamond Icon"
            className="w-6 h-6 inline-block"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>
        <h2 className="text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
          Best Selling Products
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 10).map((product) => (
          <div
            onClick={shopNavigationHandler}
            key={product._id}
            className="relative group bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col"
          >
            <div className="relative flex-1">
              <img
                src={product.image || product.images?.[0] || fallbackImages[0]}
                alt={product.name}
                className="w-full h-64 object-contain bg-white p-2"
                onError={(e) => handleImageError(e, products.indexOf(product) % fallbackImages.length)}
                loading="lazy"
              />
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            
              </div>
            </div>
            <div className="mt-2 mb-4 text-center px-4 flex-shrink-0">
              <h3 className="text-[20px] font-medium uppercase font-Brown">
                {product.name}
              </h3>
              
              <p className="text-[15px] font-Brown">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((dot) => (
            <button
              key={dot}
              className={`w-2 h-2 rounded-full ${
                dot === 1 ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSelling;