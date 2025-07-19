import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../../api/OrderService";
import LoadingSpinner from "../Common/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        to="/orders"
        className="text-orange-500 hover:text-orange-600 mb-6 inline-block"
      >
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold">Order #{order._id.slice(-6)}</h1>
          <p className="text-gray-600">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  Quantity: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-bold">₹{item.quantity * item.price}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹{order.shippingCost}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {order.shippingAddress && (
          <div className="border-t mt-6 pt-4">
            <h2 className="font-bold mb-2">Shipping Address</h2>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.pincode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
