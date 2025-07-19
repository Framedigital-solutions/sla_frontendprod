import React from "react";
import { FaPlane, FaUndo, FaHeadphones, FaShieldAlt } from "react-icons/fa";

const Features = () => {
  return (
    <div
      className="bg-beige py-10 flex justify-center items-center border-t border-gray-200"
      style={{ backgroundImage: "url('maskback.png')" }}
    >
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full max-w-3xl text-center relative">
        {/* Left Column */}
        <div className="flex flex-col items-center">
          <FaPlane className="text-3xl text-gray-700" />
          <p className="text-sm font-medium text-gray-700 mt-2">FREE TRACKED DELIVERY</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUndo className="text-3xl text-gray-700" />
          <p className="text-sm font-medium text-gray-700 mt-2">QUICK RETURNS AND EXCHANGES</p>
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>

        {/* Right Column */}
        <div className="flex flex-col items-center">
          <FaHeadphones className="text-3xl text-gray-700" />
          <p className="text-sm font-medium text-gray-700 mt-2">24/7 CUSTOMER SERVICE</p>
        </div>
        <div className="flex flex-col items-center">
          <FaShieldAlt className="text-3xl text-gray-700" />
          <p className="text-sm font-medium text-gray-700 mt-2">100% SECURE PAYMENT</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
