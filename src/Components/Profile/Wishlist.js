import React, { useState, useEffect } from "react";
import { WISHLIST } from "../../config/api.config";
import { IoClose } from "react-icons/io5";
import { userStore } from "../../store/userStore";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = userStore((state) => state._id);

  useEffect(() => {
    if (!userId) {
      alert("Please log in to view your wishlist.");
      // Optionally redirect to login
      window.location.href = "/login";
      return;
    }

    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(WISHLIST.USER(userId));

      if (!response.ok) {
        throw new Error(
          `User with ID ${userId} not found or no wishlist items.`
        );
      }

      const data = await response.json();
      setWishlistItems(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      // You'll need to implement the remove API endpoint
      // For now, just remove from local state
      setWishlistItems(
        wishlistItems.filter((item) => item.product._id !== productId)
      );

      // Example API call (implement based on your backend):
      // await fetch(
      //   `http://localhost:8000/wishlist/remove/${userId}/${productId}`,
      //   {
      //     method: "DELETE",
      //   }
      // );
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const moveToBag = async (productId, productName) => {
    try {
      // You'll need to implement the add to cart API endpoint
      alert(`Moving ${productName} to bag...`);

      // Example API call (implement based on your backend):
      // await fetch(`https://backend.srilaxmialankar.com/cart/add`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, productId, quantity: 1 })
      // });

      // Remove from wishlist after adding to bag
      removeFromWishlist(productId);
    } catch (err) {
      console.error("Failed to move to bag:", err);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#3A1E1E]">
          My Wishlist
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading your wishlist...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#3A1E1E]">
          My Wishlist
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading wishlist: {error}</div>
        </div>
      </section>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#3A1E1E]">
          My Wishlist
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Your wishlist is empty</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#3A1E1E]">
        My Wishlist ({wishlistItems.length} items)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.product._id}
            className="relative border rounded-lg shadow hover:shadow-lg transition"
          >
            {/* Remove Button */}
            <button
              onClick={() => removeFromWishlist(item.product._id)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-lg z-10 bg-white rounded-full p-1 shadow"
            >
              <IoClose />
            </button>

            {/* Product Image */}
            <img
              src={item.product.coverImage}
              alt={item.product.name}
              className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />

            {/* Product Details */}
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-sm text-center font-medium text-gray-800 mb-1">
                {item.product.name}
              </h3>

              <div className="text-xs text-gray-600 mb-2">
                <span>{item.product.category}</span>
                {item.product.carat && <span> • {item.product.carat}</span>}
              </div>

              <div className="text-xs text-gray-500 mb-2">
                Weight: {item.product.netWeight}g
              </div>

              <p className="text-lg font-semibold text-gray-900">
                ₹
                {parseFloat(item.realTimeTotalPrice).toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>

              {item.quantity > 1 && (
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              )}
            </div>

            {/* Action Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => moveToBag(item.product._id, item.product.name)}
                className="w-full bg-[#3A1E1E] text-white py-2 rounded hover:bg-[#2a1313] transition"
              >
                Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
