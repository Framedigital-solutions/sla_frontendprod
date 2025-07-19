import React, { useState } from "react";

const Check = () => {
  const [billingAddress, setBillingAddress] = useState("same");

  return (
    <div className="mx-auto mt-8 p-6 bg-white rounded-lg w-full max-w-4xl">
      {/* Contact Section */}
      <h2 className="text-lg font-bold mb-4">Contact</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email or mobile phone number"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <label className="flex items-center space-x-3 text-sm">
          <input type="checkbox" className="w-4 h-4 text-orange-600 focus:ring-orange-500" />
          <span>Email me with news and offers</span>
        </label>
      </div>

      {/* Delivery Section */}
      <h2 className="text-lg font-bold mt-6 mb-4">Delivery</h2>
      <div className="space-y-4">
        {/* Country */}
        <select
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option>Country/Region</option>
          <option>India</option>
          <option>United States</option>
          <option>United Kingdom</option>
        </select>

        {/* Name */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="First name (optional)"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Last name"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* City, State, PIN */}
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="City"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="State"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="PIN code"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <label className="flex items-center space-x-3 text-sm">
          <input type="checkbox" className="w-4 h-4 text-orange-600 focus:ring-orange-500" />
          <span>Save this information for next time</span>
        </label>
      </div>

      {/* Shipping Method */}
      <h2 className="text-lg font-bold mt-6 mb-4">Shipping method</h2>
      <input
        type="text"
        placeholder="Enter your shipping address to view available shipping methods."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        disabled
      />

      {/* Billing Address */}
      <h2 className="text-lg font-bold mt-6 mb-4">Billing address</h2>
      <div className="space-y-4">
        <label className="flex items-center space-x-3 text-sm">
          <input
            type="radio"
            name="billing-address"
            value="same"
            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
            checked={billingAddress === "same"}
            onChange={() => setBillingAddress("same")}
          />
          <span>Same as shipping address</span>
        </label>
        <label className="flex items-center space-x-3 text-sm">
          <input
            type="radio"
            name="billing-address"
            value="different"
            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
            checked={billingAddress === "different"}
            onChange={() => setBillingAddress("different")}
          />
          <span>Use a different billing address</span>
        </label>
      </div>
    </div>
  );
};

export default Check;
