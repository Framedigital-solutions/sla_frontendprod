import React from 'react';

const JewelryGrid = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="relative">
          <img
            src="Home/297.png"
            alt="New Arrival Jewelry"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
            }}
          />
          <div className="absolute inset-0 flex pt-28 flex-col items-center justify-center text-center">
            <p className="text-2xl font-garamond">NEW ARRIVAL</p>
            <p className="text-[79.33px] font-bold text-[#6E3000]">10%</p>
            <p className="text-lg font-garamond">OFF</p>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          {/* Top Bracelet Image */}
          <div className="relative">
            <img
              src="Home/299.png"
              alt="Shop Bracelets"
              className="w-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[20px] font-garamond pt-28 text-center">SHOP BRACELETS</p>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <img
                src="Home/300.png"
                alt="Shop Earings"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
                }}
              />
              <div className="absolute inset-0 flex items-center pt-64 font-garamond justify-center">
                <p className="text-[20px] font-serif text-center">SHOP<br />EARING</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="Home/301.png"
                alt="Shop Locket"
                className="w-60 h-80 object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
                }}
              />
              <div className="absolute inset-0 flex items-center pt-48 font-garamond justify-center">
                <p className="text-[20px] font-serif text-center">SHOP<br />LOCKET</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <img
            src="Home/298.png"
            alt="Special Discount"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(225deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)'
            }}
          />
          <div className="absolute inset-0 flex pt-28  flex-col items-center justify-center text-center">
            <p className="text-2xl text-[#000000] font-garamond">UPTO</p>
            <p className="text-[79.33px] font-bold text-[#6E3000]">30%</p>
            <p className="text-lg font-garamond">OFF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryGrid;