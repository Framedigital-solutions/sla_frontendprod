import React, { useState } from "react";
import { AUTH } from "../../config/api.config";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { Eye, EyeOff } from "lucide-react"; // Eye icons

const Signup = () => {
  const navigate = useNavigate();
  const setUserData = userStore((state) => state.setUserData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    addresses: [
      {
        type: "Home",
        addressLine: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        primaryPhone: "",
      },
    ],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddressChange = (field, value) => {
    const updatedAddress = { ...formData.addresses[0], [field]: value };
    setFormData({ ...formData, addresses: [updatedAddress] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        AUTH.SIGNUP,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
        setUserData(response.data);
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (error) {
      alert("Error submitting form");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://manubhai.in/SocialMedia/post_artworks/DGBD00687.jpg"
            alt="Jewelry"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center text-brown-800 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border rounded-lg px-4 py-3 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full border rounded-lg px-4 py-3 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            {/* Only Home Address */}
            <div className="bg-gray-50 p-5 rounded-xl border mb-3">
              <h4 className="font-medium text-lg text-gray-700 mb-4">
                Home Address
              </h4>

              <input
                type="text"
                placeholder="Address Line"
                value={formData.addresses[0].addressLine}
                onChange={(e) =>
                  handleAddressChange("addressLine", e.target.value)
                }
                className="w-full border mb-3 rounded-lg px-4 py-3"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.addresses[0].city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className="border rounded-lg px-4 py-3"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.addresses[0].state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className="border rounded-lg px-4 py-3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.addresses[0].zipcode}
                  onChange={(e) =>
                    handleAddressChange("zipcode", e.target.value)
                  }
                  className="border rounded-lg px-4 py-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.addresses[0].country}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  className="border rounded-lg px-4 py-3"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Primary Phone"
                value={formData.addresses[0].primaryPhone}
                onChange={(e) =>
                  handleAddressChange("primaryPhone", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4C2A2A] hover:bg-[#361d1d] transition text-white py-3 rounded-lg font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brown-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
