import React, { useState } from "react";
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
        "https://backend.srilaxmialankar.com/auth/login",
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
      const userCred = await signInWithPopup(firebaseAuth, provider);
      const token = await userCred.user.getIdToken();

      const data = await validateUserJWTToken(token);
      // const data = await validateUserJWTToken(token);
      console.log("👉 Google Login Response:", data); //
      if (data && data._id) {
        setUser({ token, ...data });
        getCart(data._id);
        localStorage.setItem("token", token);
        alert("Login successful!");
        navigate("/profile");
      } else {
        alert("User Needs to register first");
        navigate("/signup");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google sign-in failed. Please try again.");
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
