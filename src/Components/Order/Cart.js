import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import CartNotFound from "./CartNotFound";
import { userStore } from "../../store/userStore";
import { addToCart } from "../../api/CartService";

const ShoppingCart = () => {
  const { cart, getCart, removeFromCart, removeSingleItem } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const userid = userStore((state) => state._id);
  console.log("cart in cart page: " + JSON.stringify(cart, null, 2));
  console.log("cart user id: " + userid);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleQuantityChange = async (id, increment) => {
    const item = cart.find((item) => item._id === id);
    if (!item) return;

    const newQuantity = item.quantity + increment;

    if (newQuantity <= 0) {
      await removeFromCart({ userId: userid, productId: id });
    } else if (increment === 1) {
      await addToCart({ userId: userid, productId: id, quantity: 1 });
    } else if (increment === -1) {
      await removeSingleItem({ userId: userid, productId: id });
    }

    getCart(userid); // sync updated cart
  };

  // This function is preserved, but the remove button is no longer rendered
  // const handleRemoveItem = async (id) => {
  //   removeFromCart({ userId: userid, productId: id });
  //   getCart(userid); // refresh after removal
  // };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.realTimeTotalPrice) || 0;
      return total + price;
    }, 0);
  };

  const calculateTotals = () => {
    const subtotal = getSubtotal();
    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 5000 ? 0 : 50;
    const discount = 0;
    const total = subtotal + tax + shipping - discount;

    return {
      subtotal,
      tax,
      shipping,
      discount,
      total,
    };
  };

  const totals = calculateTotals();

  if (cart.length === 0) {
    return <CartNotFound />;
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-6 lg:px-10 py-10 space-y-10">
      <div className="p-6 bg-white shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#784421] text-white">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 flex items-center space-x-4">
                    <img
                      src={
                        item.images?.[0] ||
                        item.coverImage ||
                        "https://via.placeholder.com/50"
                      }
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <span className="truncate font-semibold">{item.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    ₹{item.realTimeTotalPrice / item.quantity}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center border w-fit rounded-full overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-3 py-1 bg-gray-200"
                        // disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-4 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="px-3 py-1 bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">₹{item.realTimeTotalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-6 gap-4">
          <div className="flex w-full sm:w-1/2 items-center">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border border-gray-500 outline-none p-2 w-full"
            />
            <button className="bg-[#D87F30] text-white px-6 py-2 ml-2">
              APPLY
            </button>
          </div>
          <Link
            to="/productlist"
            className="text-center text-black text-lg underline"
          >
            Continue Shopping
          </Link>
          <button className="bg-[#D87F30] text-white px-6 py-2 w-full sm:w-auto">
            UPDATE CART
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse lg:justify-between gap-6">
        <div className="p-6 bg-white shadow-md w-full lg:w-1/3">
          <h2 className="text-lg font-bold bg-[#784421] text-white px-4 py-3">
            Cart Total
          </h2>
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between py-2 text-lg">
              <span>Subtotal</span>
              <span>₹{totals.subtotal}</span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>GST (18%)</span>
              <span>₹{totals.tax}</span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Shipping</span>
              <span>₹{totals.shipping}</span>
            </div>
            <div className="flex justify-between py-2 text-lg text-green-600">
              <span>Discount</span>
              <span>₹{totals.discount}</span>
            </div>
            <div className="border-t mt-6 pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{totals.total}</span>
            </div>
          </div>
          <Link to="/checkout">
            <button className="bg-[#D87F30] text-white px-6 py-3 w-full mt-4 hover:bg-[#b56322] transition-colors">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
