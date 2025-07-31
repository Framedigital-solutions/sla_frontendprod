import React, { useState } from "react";
import { AUTH } from "../../config/api.config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userStore } from "../../store/userStore";
import { X, Phone } from "lucide-react";
import login from "../../assets/login.jpg";

const BASE_URL = AUTH.BASE;

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const setToken = userStore((state) => state.setUserToken);
  const setUserData = userStore((state) => state.setUserData);

  const sendOTP = async () => {
    if (!phone) return toast.error("Enter phone number first");

    try {
      const res = await fetch(`${BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your phone");
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong while sending OTP");
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    if (!otp) return toast.error("Enter the OTP");

    try {
      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified!");
        localStorage.setItem("token", data?.token);

        setToken(data?.token);
        const userObj = {
          token: data?.token,
          ...data?.user,
        };
        setUserData(userObj);

        setTimeout(() => navigate("/shop"), 1500);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong during verification");
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen mt-5 flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={login}
            alt="Login Visual"
            className="w-full h-full object-cover md:rounded-l-xl"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <Phone className="text-gray-600" />
            <X
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>

          <h2 className="text-xl font-semibold text-center mb-6">
            Phone Number Login
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {!otpSent ? (
                <button
                  onClick={sendOTP}
                  className="w-full sm:w-auto px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  onClick={verifyOTP}
                  className="w-full sm:w-auto px-6 py-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-all"
                >
                  Verify OTP
                </button>
              )}
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Login using Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneLogin;
