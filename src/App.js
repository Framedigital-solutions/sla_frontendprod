import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Cont from "./Components/Contact/Cont";
import Navbar from "./Components/Nav/Navbar";
import Footer from "./Components/Footer/Footer";
import About from "./Components/AboutPage/About";
import Blog from "./Components/Blogs/blog";
import ShoppingCart from "./Components/Order/Cart";
import SecureCheckout from "./Components/Order/Summar";
import Final from "./Components/Order/Final";
import NotFound from "./NotFound";
import TestConnection from "./components/TestConnection";
import ConnectionTest from "./components/ConnectionTest";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Profile from "./Components/Profile/Profile";
import Wishlist from "./Components/Profile/Wishlist";
import ProductDetailComplete from "./Components/Product/ProductList/ProductDetail";
import { useState } from "react";
import { CartProvider } from "./CartContext";
import BlogDetail from "./Components/Blogs/BlogDetail";
import OrderHistory from "./Components/Order/OrderHistory";
import OrderDetails from "./Components/Order/OrderDetails";
import ProductPage from "./Components/Product/ProductList/ProductPage";
import Terms from "./Components/Order/Terms";
import PrivacyPolicy from "./Components/Order/PrivacyPolicy";
import PhoneLogin from "./Components/SignUp/PhoneLogin";
import Shipping from "./Components/Order/Shipping";
import SupportPage from "./Components/Support/Supp";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Cont />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<SecureCheckout />} />
          <Route path="/final" element={<Final />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetailComplete />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/shop" element={<ProductPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/test-connection" element={<TestConnection />} />
          <Route path="/connection-test" element={<ConnectionTest />} />
          <Route path="/product/:productId" element={<ProductDetailComplete addToCart={addToCart} />} />
          <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/order-history"
            element={
              // <ProtectedRoute>
              <OrderHistory />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              // <ProtectedRoute>
              <OrderDetails />
              // </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
