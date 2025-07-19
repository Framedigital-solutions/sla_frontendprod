import React, { useState } from "react";
import ShoppingCart from "./Cart";
import SecureCheckout from "./Summar";
import Final from "./Final";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState("cart");

  const tabs = [
    { name: "Shopping Cart", key: "cart", },
    { name: "Checkout", key: "checkout" },
    { name: "Order Confirmation", key: "confirm" },
  ];

  return (
    <div className="mt-12">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-6 text-gray-700 text-lg mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative pb-2 text-center ${
              activeTab === tab.key ? "font-bold text-black" : "text-gray-500"
            }`}
          >
            {tab.name}
            {tab.count && ` (${tab.count})`}
            {activeTab === tab.key && (
              <span className="absolute left-0 right-0 h-[2px] bg-orange-500 bottom-0"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 border border-gray-300 rounded-lg">
        {activeTab === "cart" && <ShoppingCart />}
        {activeTab === "checkout" && <SecureCheckout />}
        {activeTab === "confirm" && <Final />}
      </div>
    </div>
  );
};

export default TabSwitcher;
