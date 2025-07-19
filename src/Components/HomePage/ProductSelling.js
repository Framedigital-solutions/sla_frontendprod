import React, { useState, useEffect } from "react";

const ProductSelling = ({ navigateShop }) => {
  const [products, setProducts] = useState([]);

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchBestSelling = async () => {
    try {
      const response = await fetch("https://backend.srilaxmialankar.com/best");
      const data = await response.json();
      console.log("Best selling data:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching best selling products:", error);
      setProducts([]);
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
            src="Category/icon.png"
            alt="Diamond Icon"
            className="w-6 h-6 inline-block"
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
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
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