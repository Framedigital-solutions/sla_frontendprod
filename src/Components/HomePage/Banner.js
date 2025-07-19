import React from "react";

const PremiumBanner = () => {
  return (
    <div className="relative bg-cover bg-center h-64 sm:h-96 mx-4 sm:mx-8 lg:mx-16 rounded-lg overflow-hidden" 
    style={{ backgroundImage: "url('banner.png')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-white h-full flex flex-col justify-center items-start px-6 sm:px-12">
        <h2 className="text-lg sm:text-3xl font-semibold mb-4">
          FIND OUR PREMIUM RANGE
        </h2>
        <h3 className="text-md sm:text-2xl font-light mb-6">
          UNIQUE COLLECTION
        </h3>
        <button className="px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          DISCOVER THE COLLECTION
        </button>
      </div>
    </div>
  );
};

export default PremiumBanner;
