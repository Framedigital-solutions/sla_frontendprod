import React, { useState, useEffect } from "react";

const JewelryShowcase = ({ navigateShop }) => {
  const [products, setProducts] = useState([]);

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://backend.srilaxmialankar.com/Everyday"
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch everyday products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShare = (product, e) => {
  e.stopPropagation(); // Prevent parent click

  const shareData = {
    title: product.name,
    text: `Check out this elegant jewelry: ${product.name}`,
    url: `https://srilaxmialankar.com/product/${product._id}`,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("Product shared successfully!"))
      .catch((error) => console.error("Sharing failed", error));
  } else {
    alert("Sharing is not supported on your browser. Copy the link manually.");
  }
};

  return (
    <div className="container mx-auto px-2">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img
            src="Category/icon.png"
            alt="Diamond Icon"
            className="w-6 h-6 inline-block"
          />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>

        <h2 className="text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
          Everyday Elegance
        </h2>

        <p className="text-[#7A3601] uppercase tracking-wide text-sm mt-1">
          DISCOVER ALL TRENDS
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
          .map((product) => (
            <div
              onClick={shopNavigationHandler}
              key={product._id}
              className="relative group rounded-lg overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain aspect-square bg-white"
                />
                <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Share Button */}
                 <button
  onClick={(e) => handleShare(product, e)}
  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2 mb-4 text-center">
                <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm font-medium">{product.description}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Dots Indicator */}
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

export default JewelryShowcase;
