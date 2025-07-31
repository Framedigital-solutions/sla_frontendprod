import apiClient from './axios';

const CartService = {
  // Add item to cart
  addToCart: async (userId, productId, quantity = 1) => {
    try {
      const response = await apiClient.post('/cart/add-to-cart', {
        userId,
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error.response?.data || error.message;
    }
  },

  // Get user's cart
  getCart: async (userId) => {
    try {
      const response = await apiClient.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error.response?.data || error.message;
    }
  },

  // Update cart item quantity
  updateCartItem: async (userId, productId, quantity) => {
    try {
      const response = await apiClient.patch(`/cart/${userId}/items/${productId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error.response?.data || error.message;
    }
  },

  // Remove item from cart
  removeFromCart: async (userId, productId) => {
    try {
      const response = await apiClient.delete('/cart/remove-from-cart', {
        data: { userId, productId }
      });
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error.response?.data || error.message;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const response = await apiClient.delete(`/cart/clear/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default CartService;
