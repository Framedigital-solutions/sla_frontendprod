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
    if (!productObj?.userId || !productObj?.productId) {
      console.error("Invalid product object:", productObj);
      throw new Error("Invalid product data");
    }

    try {
      console.log("Adding to cart:", productObj);
      const data = await addToCart(productObj);
      
      if (!data || !data.cart) {
        console.error("Invalid response from addToCart:", data);
        throw new Error("Failed to add item to cart");
      }

      console.log("Item added to cart:", data);
      
      // Update local storage with the new cart ID if available
      if (data.cart.cartId) {
        localStorage.setItem("cartId", data.cart.cartId);
      }
      
      // Refresh the cart to ensure we have the latest state
      await getCartHandler({ userId: productObj.userId });
      
      return data;
    } catch (error) {
      console.error("Error in addToCartHandler:", error);
      throw error; // Re-throw to allow handling in the component
    }
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
    if (!userObj || !userObj.userId) {
      console.error("Invalid user object provided to getCartHandler");
      setCart([]); // Reset cart if no valid user
      return;
    }

    try {
      console.log("Fetching cart for user:", userObj.userId);
      const data = await getCart(userObj.userId);
      
      // Handle case where data is not in expected format
      if (!data) {
        console.warn("No data received from getCart");
        setCart([]);
        return;
      }

      console.log("Cart data received:", data);
      
      let dataItems = [];
      if (Array.isArray(data.items)) {
        dataItems = [...data.items];
      } else if (data.items && typeof data.items === 'object') {
        // Handle case where items might be an object instead of array
        dataItems = Object.values(data.items);
      }

      // Set the cartId in the store and local storage
      if (data.cartId) {
        console.log("Setting cart ID:", data.cartId);
        localStorage.setItem("cartId", data.cartId);
        userStore.getState().setCartId(data.cartId);
      }

      // Transform and set cart items
      const cartItems = dataItems
        .filter(item => item && item.product) // Filter out invalid items
        .map(item => ({
          ...item.product,
          quantity: item.quantity || 1,
          realTimeTotalPrice: item.realTimeTotalPrice || (item.product?.price * (item.quantity || 1))
        }));

      console.log("Setting cart items:", cartItems);
      setCart(cartItems);
      
    } catch (error) {
      console.error("Error in getCartHandler:", error);
      // Don't clear cart on error to prevent UI flicker
      // The error is already logged, no need to throw
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
