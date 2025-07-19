import { redirect } from "react-router-dom";
import { userStore } from "../store/userStore";
import { load } from "@cashfreepayments/cashfree-js";

// const BASE_URL = "https://backend.srilaxmialankar.com/order";
// const BASE_URL = "https://backend.srilaxmialankar.com/order";
// const BASE_URL = "https://backend.srilaxmialankar.com/order";
const BASE_URL = "https://backend.srilaxmialankar.com/order";
// const BASE_URL = "https://backend.srilaxmialankar.com/order";
// session_25GiIcZvoOd02yUSgNpoteTHTQJMBRi7qv4RI9P9km96o4sxC3113YEDXmyr88xUdhrxycls4C5TegCF9rN1w6qWl4sZkhxrCyhxdZ5iiY68BJks4sIlM5qmb98pQApaymentpayment
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  //   const token = userStore((state) => state.token);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createOrder = async (orderData) => {
  const cashfree = await load({
    mode: "sandbox",
  });

  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    console.log(
      "response from create order " + JSON.stringify(result, null, 2)
    );

    if (!response.ok) {
      console.error("🧨 Order creation failed:", result);
      throw new Error(result.message || "Failed to create order");
    }

    // res.paymentSessionId

    let sessionId = result.paymentSessionId;
    let orderId = result.order.cashfree.orderId;
    let checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    };

    console.log("paymentSessionId: " + sessionId);
    console.log("orderId: " + orderId);

    cashfree.checkout(checkoutOptions).then((res) => {
      console.log("payment initialized");
      verifyPayment(orderId);
      redirect("/confirm");
    });

    return result;
  } catch (error) {
    console.error("🔥 createOrder error:", error);
    throw new Error(error.message);
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-payment`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error("Payment verification failed");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/${orderId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch order details");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
