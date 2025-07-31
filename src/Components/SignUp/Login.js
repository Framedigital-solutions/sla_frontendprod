import React, { useState } from "react";
import { AUTH } from "../../config/api.config";
import { Link, useNavigate } from "react-router-dom";
import { X, User } from "lucide-react";
import { userStore } from "../../store/userStore";
import { useCart } from "../../CartContext";
import login from "../../assets/login.jpg";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { validateUserJWTToken } from "../../api/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const setUser = userStore((state) => state.setUserData);
  const { getCart } = useCart();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        AUTH.LOGIN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      console.log("result after login " + JSON.stringify(result, null, 2));

      if (response.ok) {
        alert("Login successful!");
        navigate("/profile");
        setUser({ token: result.token, ...result?.user });
        getCart(result?.user._id);
        localStorage.setItem("token", result?.token);
      } else {
        alert("User Needs to register first");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      console.log('Starting Google Sign-In flow...');
      
      // Step 1: Sign in with Google popup
      const userCred = await signInWithPopup(firebaseAuth, provider);
      console.log('Google Sign-In successful, user:', userCred.user);
      
      // Step 2: Get ID token
      const token = await userCred.user.getIdToken();
      console.log('Obtained ID token');

      // Step 3: Validate token with backend
      console.log('Validating token with backend...');
      const data = await validateUserJWTToken(token);
      
      if (data && data._id) {
        // Successful login
        console.log('User authenticated successfully:', data);
        setUser({ token, ...data });
        await getCart(data._id);
        localStorage.setItem("token", token);
        
        // Show success message and redirect
        alert("Login successful!");
        navigate("/profile");
      } else {
        // User needs to register first
        console.log('User needs to register first');
        alert("Please complete your registration first.");
        // Store the Google auth data for registration
        localStorage.setItem('googleAuthData', JSON.stringify({
          email: userCred.user.email,
          name: userCred.user.displayName,
          photoURL: userCred.user.photoURL,
          token
        }));
        navigate("/signup", { 
          state: { 
            fromGoogle: true,
            email: userCred.user.email,
            name: userCred.user.displayName
          } 
        });
      }
    } catch (err) {
      console.error('Google Sign-In Error:', {
        code: err.code,
        message: err.message,
        email: err.email,
        credential: err.credential,
        stack: err.stack
      });
      
      let errorMessage = "Google sign-in failed. ";
      
      // Handle specific error cases
      if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email address but was created using a different sign-in method.\n\n' +
                     'Please try signing in with your email and password, or use the "Forgot Password" link if you don\'t remember your password.\n\n' +
                     'If you need assistance, please contact our support team.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was canceled.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage += 'Please allow popups for this website to sign in with Google.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage += 'Network error. Please check your internet connection.';
      } else {
        errorMessage += 'Please try again later.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <section className="min-h-screen mt-5 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={login}
            alt="Jewellery"
            className="w-full h-full object-cover md:rounded-l-xl"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <User className="text-gray-600" />
            <X
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your e-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="bestsite@gmail.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="********"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => navigate("/signup")}
                type="button"
                className="w-full sm:w-auto px-6 py-2 rounded-full border-2 border-[#4C2A2A] text-[#4C2A2A] font-medium hover:bg-[#f5f5f5] transition-all"
              >
                Register
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#4C2A2A] text-white font-medium hover:bg-[#3b1f1f] transition-all"
              >
                Log in
              </button>
            </div>

            {/* Login with Phone Number */}
            <div className="flex justify-center gap-10 mt-4">
              <button
                type="button"
                onClick={() => navigate("/phone-login")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <img src={"/phone.png"} width={30} height={30} alt="phoneImg" />
              </button>
              <button
                type="button"
                onClick={loginWithGoogleHandler}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <img
                  src={"/google.png"}
                  width={30}
                  height={30}
                  alt="phoneImg"
                />
              </button>
            </div>

            <div className="text-sm text-right mt-4">
              <Link
                to="/forgot-password"
                className="text-gray-500 hover:text-gray-700"
              >
                Recover Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
