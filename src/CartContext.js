import { createContext, useContext, useState } from "react";
import {
  addToCart,
  getCart,
  removeFromCart,
  removeSingleItem,
} from "./api/CartService";
import { createOrder, verifyPayment } from "./api/OrderService";
import { userStore } from "./store/userStore";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeSingleItem: () => {},
  removeFromCart: () => {},
  setCart: () => {},
  getCart: () => {},
  clearCart: () => {},
  placeOrder: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const setCartId = userStore((state) => state.setCartId);

  const addToCartHandler = async (productObj) => {
    // console.log(JSON.stringify(productObj, null, 2));
    const data = await addToCart(productObj);
    console.log("data after add to cart " + JSON.stringify(data, null, 2));
    localStorage.setItem("cartId", data?.cart.cartId);
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    let cartData = JSON.parse(localStorage.getItem("cart"));
    cartData.push(data?.cart);
    localStorage.setItem("cart", JSON.stringify(cartData));
    getCartHandler(data?.cart.userId);
  };

  const removeFromCartHandler = async (userObj) => {
    const data = await removeFromCart(userObj);
    console.log("data after remove from cart " + JSON.stringify(data, null, 2));
    getCartHandler(userObj.userId); // <- Refresh cart
  };

  const removeSingleItemHandler = async (userObj) => {
    const data = await removeSingleItem(userObj);
    console.log(
      "data after remove single cart " + JSON.stringify(data, null, 2)
    );
    getCartHandler(userObj.userId); // <- Refresh cart
  };

  const getCartHandler = async (userObj) => {
    //  console.log("userObj " + userObj);

    try {
      const data = await getCart(userObj);
      let dataItems = [];

      if (data?.items?.length > 0) {
        dataItems = [...data.items];
      }

      console.log("cart data " + JSON.stringify(data, null, 2));
      console.log("cart id in context getcart handler  " + data?.cartId);
      // Set the cartId in the store
      if (data?.cartId) {
        localStorage.setItem("cartId", data?.cartId);
        userStore.getState().setCartId(data.cartId); // Update cartId in Zustand store
      }

      // Set the cart items in the store
      setCart(
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

  const clearCartHandler = () => {
    setCart([]);
  };

  const placeOrderHandler = async (orderData) => {
    console.log("cart id " + JSON.stringify(orderData, null, 2));
    try {
      const data = await createOrder(orderData);
      console.log("✅ Order response:", data);

      if (orderData.paymentMethod === "ONLINE") {
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: data.razorpayOrder.amount,
          currency: "INR",
          name: "Jewellery Store",
          description: "Order Payment",
          order_id: data.razorpayOrder.id,
          handler: async function (response) {
            const paymentData = {
              ...response,
              orderId: data.order._id,
            };

            try {
              const verifyResponse = await verifyPayment(paymentData);
              console.log("✅ Payment verified:", verifyResponse);
              alert("Payment successful!");
              clearCartHandler();
            } catch (err) {
              console.error("❌ Payment verification failed:", err.message);
              alert("Payment failed or verification failed.");
            }
          },
          prefill: {
            name: orderData.shippingAddress.fullName,
            email: "mukut@test.com",
            contact: orderData.shippingAddress.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Order placed successfully with COD!");
        clearCartHandler();
      }
    } catch (error) {
      console.error("❌ Error placing order:", error.message);
      console.log("🔥 Full error object:", error);
      alert("Failed to place order");
    }
  };

  console.log("cart from context " + JSON.stringify(cart, null, 2));

  const cartContextValues = {
    cart,
    setCart,
    addToCart: addToCartHandler,
    removeSingleItem: removeSingleItemHandler,
    removeFromCart: removeFromCartHandler,
    getCart: getCartHandler,
    clearCart: clearCartHandler,
    placeOrder: placeOrderHandler,
  };

  return (
    <CartContext.Provider value={cartContextValues}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
