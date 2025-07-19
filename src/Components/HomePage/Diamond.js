import React from "react";

const PremiumCollectionBanner = () => {
  return (
    <div className="relative w-full mt-9 max-w-screen-2xl mx-auto">
      {/* Background Image */}
      <img
        src="Feature/Image.png" // Replace with your actual image path
        alt="Premium Diamond Ring"
        className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center px-6 md:px-12 lg:px-20 text-center md:text-left">
        <div className="text-white p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-3xl lg:text-5xl font-serif leading-tight">
            FIND OUR PREMIUM RANGE
            <br />
            UNIQUE COLLECTION
          </h2>
          <button className="mt-4 px-6 py-3 border border-white text-white text-sm md:text-base lg:text-lg hover:bg-white hover:text-black transition">
            DISCOVER THE COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumCollectionBanner;
