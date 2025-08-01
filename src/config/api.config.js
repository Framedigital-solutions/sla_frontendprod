// API Configuration
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const BASE_URL = process.env.REACT_APP_API_URL || (IS_DEVELOPMENT ? '' : 'https://backend.srilaxmialankar.com');

// Authentication endpoints
const AUTH = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  PHONE_LOGIN: `${BASE_URL}/auth/phone-login`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
};

// Product endpoints
const PRODUCTS = {
  LIST: `${BASE_URL}/gold`,
  DETAIL: (id) => `${BASE_URL}/gold/${id}`,
  FEATURED: `${BASE_URL}/gold?featured=true`,
  BEST_SELLING: `${BASE_URL}/gold?bestSelling=true`,
  EVERYDAY: `${BASE_URL}/gold?everyday=true`,
  CAROUSEL: `${BASE_URL}/crousel`,
  GOLD: `${BASE_URL}/gold`,
};

// Category endpoints
const CATEGORIES = {
  ALL: `${BASE_URL}/category/getAllCategory`,
  PRODUCTS: (categoryId) => `${BASE_URL}/gold?category=${categoryId}`
};

// Wishlist endpoints
const WISHLIST = {
  BASE: `${BASE_URL}/wishlist/wishlist`,
  USER: (userId) => `${BASE_URL}/wishlist/wishlist/${userId}`,
  REMOVE: (userId, productId) => `${BASE_URL}/wishlist/remove/${userId}/${productId}`,
};

// Cart endpoints
const CART = {
  BASE: `${BASE_URL}/cart`,
  ADD: `${BASE_URL}/cart/add-to-cart`,
  USER: (userId) => `${BASE_URL}/cart/cart/${userId}`,
  REMOVE_ITEM: `${BASE_URL}/cart/remove-item`,
  REMOVE_SINGLE_ITEM: `${BASE_URL}/cart/remove-single-item`
};

// Support endpoints
const SUPPORT = {
  TICKETS: `${BASE_URL}/ticket/tickets`,
  CREATE_TICKET: `${BASE_URL}/support`,
};

// Other endpoints
const OTHER = {
  TESTIMONIALS: `${BASE_URL}/testimonial`,
  CAROUSEL: `${BASE_URL}/crousel`,
  INSTAGRAM: `${BASE_URL}/instagram`,
  GOLD_PRICE: `${BASE_URL}/today-price/PriceRouting`,
};

// WebSocket configuration
const WS_CONFIG = {
  ENABLED: !IS_DEVELOPMENT, // Disable WebSocket in development
  BASE: 'wss://backend.srilaxmialankar.com',
  GOLD_PRICE: 'wss://backend.srilaxmialankar.com/ws/goldprice',
};

export {
  BASE_URL,
  AUTH,
  PRODUCTS,
  CATEGORIES,
  WISHLIST,
  CART,
  SUPPORT,
  OTHER,
  WS_CONFIG,
};

// Log the configuration for debugging
console.log('API Configuration loaded:', {
  BASE_URL,
  AUTH,
  PRODUCTS,
  CATEGORIES,
  WISHLIST,
  CART,
  SUPPORT,
  OTHER,
  WS_CONFIG,
});
