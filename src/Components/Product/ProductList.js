import React from 'react';
import { FaGem } from 'react-icons/fa'; // Using a gem icon as an example

const RelatedProducts = () => {
  return (
    <div className="flex flex-col items-center my-6 md:my-8">
      {/* Divider lines and Icon */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="border-t border-gray-300 w-16 md:w-20"></div>
        <FaGem className="text-gray-500 text-lg md:text-xl" /> {/* Icon in the center */}
        <div className="border-t border-gray-300 w-16 md:w-20"></div>
      </div>

      {/* Title */}
      <h2 className="text-orange-600 text-base md:text-lg font-semibold mt-2">Related Products</h2>
    </div>
  );
};

export default RelatedProducts;
