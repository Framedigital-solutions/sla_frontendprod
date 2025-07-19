import React, { useState, useEffect } from "react";

const FeatureProducts = ({ navigateShop }) => {
  const [products, setProducts] = useState([]);

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(
        "https://backend.srilaxmialankar.com/feature"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching feature products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="container mx-auto py-10 px-2">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img src="Category/icon.png" alt="Diamond Icon" className="w-6 h-6" />
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
              src="sla.jpg"
              alt="New Collection"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((product) => (
                <div
                  onClick={shopNavigationHandler}
                  key={product._id}
                  className="rounded-xl shadow transition duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="flex-1 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {/* Name & Optional Description */}
                  <div className="text-center py-3 px-2 flex-shrink-0">
                    <h3 className="font-Brown uppercase text-sm text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
