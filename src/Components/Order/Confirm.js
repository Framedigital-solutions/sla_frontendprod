import React from "react";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 md:px-16 py-12 flex flex-col lg:flex-row justify-between items-start">
      {/* Left Section - Billing Details */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          Thanks for your purchase
        </h2>
        <p className="text-gray-700 text-lg">
          Your order will be processed within 2 working days. We will notify you
          by email once your order has been shipped.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900">
          Billing Address
        </h3>
        <div className="text-gray-800 space-y-2">
          <p>
            <span className="font-semibold">Name:</span> Jony
          </p>
          <p>
            <span className="font-semibold">Address:</span> E-24, Uttam Nagar Om
            Vihar, New Delhi - 110059
          </p>
          <p>
            <span className="font-semibold">Phone:</span> 9999999999
          </p>
          <p>
            <span className="font-semibold">Email:</span> itsmejony@gmail.com
          </p>
        </div>

        <button className="bg-[#D87F30] text-white px-6 py-3 font-semibold rounded-md shadow-md hover:bg-[#b56322] transition-all">
          Track Your Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
