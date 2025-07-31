# Sri Laxmi Alankar - Frontend Setup

This document provides an overview of the frontend setup and how to connect to the backend API.

## Available Services

### 1. Authentication
- **File**: `src/api/authService.js`
- **Functions**:
  - `login(email, password)` - Authenticate user
  - `signup(userData)` - Register new user
  - `logout()` - Clear authentication data
  - `getCurrentUser()` - Get current user data
  - `validateUserJWTToken(token)` - Validate JWT token (for social login)

### 2. Products
- **File**: `src/api/productService.js`
- **Functions**:
  - `getProducts(page, limit)` - Get paginated products
  - `getProductById(id)` - Get single product by ID
  - `createProduct(productData)` - Create new product (admin)
  - `updateProduct(id, productData)` - Update product (admin)
  - `deleteProduct(id)` - Delete product (admin)
  - `getGoldPrice()` - Get current gold price

### 3. Cart
- **File**: `src/api/cartService.js`
- **Functions**:
  - `addToCart(userId, productId, quantity)` - Add item to cart
  - `getCart(userId)` - Get user's cart
  - `updateCartItem(userId, productId, quantity)` - Update item quantity
  - `removeFromCart(userId, productId)` - Remove item from cart
  - `clearCart(userId)` - Clear user's cart

## Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### CORS Configuration
CORS is configured in the backend to allow requests from:
- http://localhost:3000
- https://srilaxmialankar.com
- https://www.srilaxmialankar.com
- https://backend.srilaxmialankar.com

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## API Base URL
By default, the app connects to `http://localhost:8000` in development and `https://backend.srilaxmialankar.com` in production.

## Authentication Flow
1. User logs in/signs up
2. On successful authentication, JWT token is stored in localStorage
3. Token is automatically attached to subsequent API requests
4. Protected routes check for valid authentication

## State Management
- Local state for UI components
- Context API for global state (e.g., authentication, cart)
- Custom hooks for data fetching and state management
 