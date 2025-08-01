import { CART } from '../config/api.config';

// Product to add - {userId, productId, quantity}
export const addToCart = async (productToAdd) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(CART.ADD, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productToAdd),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error adding to cart:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to add to cart");
    }

    console.log("Product added to cart:", data);
    return data;
  } catch (error) {
    console.error("Error in addToCart:", error);
    throw error; // Re-throw to allow handling in the component
  }
};

// Get cart for a specific user
export const getCart = async (userId) => {
  console.log("Fetching cart for user:", userId);
  try {
    // Get the authentication token from local storage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error("No authentication token found");
      return { items: [] }; // Return empty cart if not authenticated
    }

    const response = await fetch(CART.USER(userId), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error fetching cart:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to fetch cart");
    }

    console.log("Cart data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getCart:", error);
    // Return an empty cart structure on error to prevent crashes
    return { items: [], cartId: null };
  }
};

// Remove a single quantity of an item from cart
// userObj: { userId, productId }
export const removeSingleItem = async (userObj) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(CART.REMOVE_SINGLE_ITEM, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error removing item from cart:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to remove item from cart");
    }

    console.log("Item quantity reduced:", data);
    return data;
  } catch (error) {
    console.error("Error in removeSingleItem:", error);
    throw error;
  }
};

// Remove all quantities of an item from cart
// userObj: { userId, productId }
export const removeFromCart = async (userObj) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(CART.REMOVE_ITEM, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error removing item from cart:", data.message || "Unknown error");
      throw new Error(data.message || "Failed to remove item from cart");
    }

    console.log("Item removed from cart:", data);
    return data;
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    throw error;
  }
};
