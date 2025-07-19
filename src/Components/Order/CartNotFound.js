import React from "react";
import { Link } from "react-router-dom";

const CartNotFound = () => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        className="w-48 h-48 mb-6"
      />
      <h2 className="text-3xl font-bold mb-3 text-gray-800">
        Your cart is empty!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link to="/productlist">
        <button className="bg-orange-500 text-white px-8 py-3 text-lg font-semibold shadow-md hover:bg-orange-600 transition-all">
          Start Shopping
        </button>
      </Link>
    </div>
  );
};

export default CartNotFound;
