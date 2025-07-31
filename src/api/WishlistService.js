import apiClient from './axios';

export const WishlistService = {
  // Get user's wishlist
  getWishlist: async (userId) => {
    try {
      const response = await apiClient.get(`/wishlist/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error.response?.data || error.message;
    }
  },

  // Add item to wishlist
  addToWishlist: async (productData) => {
    try {
      const response = await apiClient.post('/wishlist/wishlist', productData);
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error.response?.data || error.message;
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (userId, productId) => {
    try {
      const response = await apiClient.delete(`/wishlist/wishlist/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error.response?.data || error.message;
    }
  },

  // Check if product is in wishlist
  isInWishlist: async (userId, productId) => {
    try {
      const response = await apiClient.get(`/wishlist/wishlist/${userId}/check/${productId}`);
      return response.data.isInWishlist || false;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  }
};

export default WishlistService;
