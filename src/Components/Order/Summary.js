import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import { userStore } from "../../store/userStore";
import { createOrder } from "../../api/OrderService";

const OrderSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const userDetails = userStore((state) => state);
  const { placeOrder, getCart } = useCart();
  const cart = JSON.parse(localStorage.getItem("cart"));

  console.log("userDetails " + JSON.stringify(userDetails, null, 2));
  console.log("Cart on Checkout" + JSON.stringify(cart, null, 2));

  // Function to fetch cart data
  const getCartHandler = async (userObj) => {
    try {
      const data = await getCart(userObj);
      let dataItems = [];

      if (data?.items?.length > 0) {
        dataItems = [...data.items];
      }

      console.log("cart data " + JSON.stringify(data, null, 2));

      // Set the cartId in the store
      if (data?.cartId) {
        userStore.getState().setCartId(data.cartId); // Update cartId in Zustand store
      }

      // Set the cart items in the store
      userStore.getState().setCartItems(
        dataItems.map((item) => ({
          quantity: item?.quantity,
          realTimeTotalPrice: item?.realTimeTotalPrice,
          ...item?.product,
        }))
      );
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };
  // Fetch cartId from userStore directly
  // const cartId = userStore((state) => state.cartId);
  const cartId = localStorage.getItem("cartId");

  // Ensure cartId is fetched and set before rendering the component
  useEffect(() => {
    // If the cartId is missing, fetch it again
    if (!cartId && userDetails?._id) {
      console.log("Cart ID is missing, fetching cart...");
      getCartHandler({ userId: userDetails?._id }); // Pass the userId to fetch the cart
    }
  }, [cartId, userDetails?._id]); // Only run if cartId or userId changes

  console.log("cartId in summary: ", cartId);

  // Handler to place the order
  const placeOrderHandler = async () => {
    if (!cartId) {
      console.error("Cart ID is missing, cannot place the order.");
      return;
    }

    try {
      // Proceed with order placement
      // await placeOrder({
      //   cartId: { _id: cartId },
      //   shippingAddress: { ...userDetails.addresses[0] },
      //   paymentMode: "ONLINE",
      // });

      await createOrder({
        cartId: { _id: cartId },
        shippingAddress: { ...userDetails.addresses[0] },
        paymentMethod: "ONLINE",
      });
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  const products = [
    {
      image: "https://manubhai.in/SocialMedia/post_artworks/DGBD00687.jpg",
      title: "DIAMOND CRISTIRIAL STUD",
      quantity: 2,
      price: 3000,
    },
    {
      image: "https://manubhai.in/SocialMedia/post_artworks/DGBD00687.jpg",
      title: "GOLD PENDANT",
      quantity: 1,
      price: 15000,
    },
  ];

  const subtotal = cart.reduce(
    (total, cartItem) =>
      total + cartItem.realTimeTotalPrice * cartItem.quantity,
    0
  );
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="mx-auto mt-8 p-6 border rounded-lg w-full max-w-2xl">
      <h2 className="text-lg font-bold mb-6">Billing details</h2>
      {/* <div className="space-y-6">
        {cart.map((cartItem, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={cartItem.coverImage}
                alt={cartItem.name}
                className="w-16 h-16 rounded-md"
              />
              <div className="ml-4">
                <p className="font-medium text-sm">{cartItem.name}</p>
                <p className="text-xs text-gray-500">QTY {cartItem.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-semibold">
              ₹{cartItem.realTimeTotalPrice * cartItem.quantity}
            </p>
          </div>
        ))}
      </div> */}

      {/* Subtotal */}
      {/* <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between pt-4">
          <p className="text-sm text-gray-500">SUBTOTAL</p>
          <p className="text-sm font-semibold">₹{subtotal}</p>
        </div>
        <div className="flex justify-between pt-4">
          <p className="text-sm text-gray-500">GST 18%</p>
          <p className="text-sm font-semibold">₹{gst.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg pt-4 font-bold">
          <p>Total</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div> */}

      {/* Payment Method */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold">Choose payment method</h3>
        <div className="mt-4 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment-method"
              value="debit-credit"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
              checked={paymentMethod === "debit-credit"}
              onChange={() => setPaymentMethod("debit-credit")}
            />
            <span className="text-sm">Debit/Credit Card</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment-method"
              value="bank-transfer"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
              checked={paymentMethod === "bank-transfer"}
              onChange={() => setPaymentMethod("bank-transfer")}
            />
            <span className="text-sm">IMPS/Bank Transfer</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment-method"
              value="upi"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <span className="text-sm">UPI Payment app</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment-method"
              value="cash-on-delivery"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
              checked={paymentMethod === "cash-on-delivery"}
              onChange={() => setPaymentMethod("cash-on-delivery")}
            />
            <div>
              <span className="text-sm font-semibold">Cash on Delivery</span>
              <p className="text-xs text-gray-500">
                Pay with cash upon delivery.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      {/* <Link to="/confirm"> */}
      <button
        onClick={placeOrderHandler}
        type="button"
        className="mt-6 w-full py-3 text-center bg-orange-600 text-white font-bold text-sm rounded-md hover:bg-orange-500 transition"
      >
        PLACE ORDER
      </button>
      {/* </Link> */}
    </div>
  );
};

export default OrderSummary;
