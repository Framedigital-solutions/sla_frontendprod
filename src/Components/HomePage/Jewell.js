import React from "react";

const JewelryShowcase = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 relative">
      {/* Floating Hearts on Right (Top & Bottom) */}
      <div className="absolute right-0 top-0 hidden sm:block">
        <img
          src="Gifts/heart.png" // Ensure the correct path
          alt="Floating Heart"
          className="absolute w-8 h-8 opacity-60"
          style={{ right: "20px", top: "20px" }}
        />
        <img
          src="/Gifts/heart.png"
          alt="Floating Heart"
          className="absolute w-8 h-8 opacity-60"
          style={{ right: "20px", bottom: "20px" }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Promotional Banner */}
          <div className="relative bg-zinc-900 rounded-lg overflow-hidden h-[200px] sm:h-[300px]">
            <img
              src="Gifts/card.png"
              alt="Gift Promotion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 p-4 sm:p-6">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <img src="" alt="Hiraganna" className="w-6 h-6 mb-2 sm:mb-4" />
                </div>
                <div className="text-white text-xs">www.hiraganna.com</div>
              </div>
            </div>
          </div>

          {/* Bottom Row Items */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-orange-400 rounded-lg p-2 sm:p-4 flex flex-col items-center bg-white">
              <img
                src="Gifts/gift3.png"
                alt="Ring"
                className="w-full h-24 sm:h-32 object-contain mb-2"
              />
              <span className="text-orange-800 text-sm sm:text-base">Ring</span>
            </div>
            <div className="border-2 border-orange-400 rounded-lg p-2 sm:p-4 flex flex-col items-center bg-white">
              <img
                src="Gifts/chain.png"
                alt="Chain"
                className="w-full h-24 sm:h-32 object-contain mb-2"
              />
              <span className="text-orange-800 text-sm sm:text-base">Chain</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Top Row Items */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-orange-400 rounded-lg p-2 sm:p-4 flex flex-col items-center bg-gradient-to-b from-[#E66E06] via-[#E66E06A0] to-[#FFFFFF]">
              <img
                src="Gifts/gift1.png"
                alt="Bangles"
                className="w-full h-24 sm:h-32 object-contain mb-2"
              />
              <span className="text-orange-800 text-sm sm:text-base">Bangles</span>
            </div>

            <div className="border-2 border-orange-400 rounded-lg p-2 sm:p-4 flex flex-col items-center bg-white">
              <img
                src="Gifts/gift2.png"
                alt="Ring"
                className="w-full h-24 sm:h-32 object-contain mb-2"
              />
              <span className="text-orange-800 text-sm sm:text-base">Ring</span>
            </div>
          </div>

          {/* Silver Ring Banner */}
          <div className="rounded-lg relative">
            <div className="text-center">
              <img
                src="Gifts/Silver.png"
                alt="Premium Ring"
                className="w-full h-80 pl-3 mt-4 sm:mt-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryShowcase;
