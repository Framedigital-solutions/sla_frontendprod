import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Jewellery-themed dummy order data
    const dummyOrders = [
      {
        _id: "JWL-ORD-1001",
        createdAt: "2025-04-20T11:30:00Z",
        total: 78999,
        status: "Delivered",
        items: [
          {
            name: "18K Gold Diamond Ring",
            quantity: 1,
            realTimeTotalPrice: 45999,
            images: ["https://picsum.photos/200/300"],
          },
          {
            name: "Silver Pearl Earrings",
            quantity: 2,
            realTimeTotalPrice: 33000,
            images: ["https://picsum.photos/200/300"],
          },
        ],
      },
      {
        _id: "JWL-ORD-1002",
        createdAt: "2025-04-10T14:00:00Z",
        total: 124999,
        status: "Shipped",
        items: [
          {
            name: "22K Gold Necklace Set",
            quantity: 1,
            realTimeTotalPrice: 124999,
            images: ["https://picsum.photos/200/300"],
          },
        ],
      },
    ];

    setOrders(dummyOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
          <Link to="/productlist" className="text-[#D87F30] underline text-lg">
            Explore Jewellery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      <div className="p-6 bg-white shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="bg-[#784421] text-white px-4 py-3 flex justify-between items-center">
                <div>
                  <span className="font-semibold">Order ID:</span> {order._id}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-4 space-y-4 bg-white">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-medium text-[#784421]">
                      ₹{item.realTimeTotalPrice.toLocaleString()}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>

                <div className="text-right text-sm text-gray-500 italic">
                  Status: {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
