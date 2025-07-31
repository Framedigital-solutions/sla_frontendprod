import { redirect } from "react-router-dom";

import { load } from "@cashfreepayments/cashfree-js";
import { BASE_URL } from "../config/api.config";

const ORDER_BASE_URL = `${BASE_URL}/order`;

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
    const response = await fetch(`${ORDER_BASE_URL}/create`, {
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
    const response = await fetch(`${ORDER_BASE_URL}/verify`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error("Payment verification failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await fetch(`${ORDER_BASE_URL}/user`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user orders");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await fetch(`${ORDER_BASE_URL}/user/${orderId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order details");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
