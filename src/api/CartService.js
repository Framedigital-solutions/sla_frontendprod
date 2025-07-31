import { BASE_URL } from '../config/api.config';

// Product to add - {userId, productId, quantity}
export const addToCart = async (productToAdd) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd),
    });

    console.log(
      "response from add to cart " + JSON.stringify(response, null, 2)
    );

    if (!response.ok) throw new Error("Failed to add to the cart ");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Userid bhejna hai!
export const getCart = async (userId) => {
  console.log("userid in cart service " + userId);
  try {
    const res = await fetch(`${BASE_URL}/cart/cart/${userId}`);
    const data = await res.json();

    // console.log("data " + data?.cartId);
    if (!res.ok) {
      throw new Error("Failed to get items from cart");
    }

    console.log("data getCart Cart Service: " + JSON.stringify(data, null, 2));
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

// userId, ProductId
export const removeSingleItem = async (userObj) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/cart/remove-single-item`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    });
    if (!res.ok) throw new Error("Failed to remove single item cart ");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeFromCart = async (userObj) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/remove-from-cart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    });
    if (!res.ok) throw new Error("Failed to remove from the cart ");
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
