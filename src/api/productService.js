import apiClient from './axios';
import { PRODUCTS, CATEGORIES } from '../config/api.config';

const ProductService = {
  // Get all products
  getProducts: async (params = {}) => {
    try {
      console.log('Fetching products from:', PRODUCTS.LIST, 'with params:', params);
      const response = await apiClient.get(PRODUCTS.LIST, { params });
      
      // Log the raw response for debugging
      console.log('Raw API response:', response);
      
      // Handle different response formats
      if (response.data) {
        // Case 1: Products are nested in a 'products' property
        if (response.data.products && Array.isArray(response.data.products)) {
          console.log(`Received ${response.data.products.length} products from API (nested in 'products' property)`);
          return response.data.products;
        }
        // Case 2: Products are nested in a 'data' property
        else if (response.data.data && Array.isArray(response.data.data)) {
          console.log(`Received ${response.data.data.length} products from API (nested in 'data' property)`);
          return response.data.data;
        }
        // Case 3: Products are at the root level
        else if (Array.isArray(response.data)) {
          console.log(`Received ${response.data.length} products from API (root level array)`);
          return response.data;
        }
      }
      
      console.warn('Unexpected API response format:', response.data);
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      return [];
    }
  },
  
  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get(CATEGORIES.PRODUCTS(categoryId));
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      return [];
    }
  },

  // Get a single product by ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(PRODUCTS.DETAIL(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw new Error(error.response?.data?.message || 'Failed to fetch product details.');
    }
  },
  
  // Get carousel items
  getCarouselItems: async () => {
    try {
      const response = await apiClient.get(PRODUCTS.CAROUSEL);
      return response.data;
    } catch (error) {
      console.error('Error fetching carousel items:', error);
      return []; // Return empty array as fallback
    }
  },

  // Create a new product (admin only)
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/gold', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error.response?.data || error.message;
    }
  },

  // Update a product (admin only)
  updateProduct: async (id, productData) => {
    try {
      const response = await apiClient.put(`/gold/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error.response?.data || error.message;
    }
  },

  // Delete a product (admin only)
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`/gold/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error.response?.data || error.message;
    }
  },

  // Get gold price
  getGoldPrice: async () => {
    try {
      const response = await apiClient.get('/today-price');
      return response.data;
    } catch (error) {
      console.error('Error fetching gold price:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default ProductService;
