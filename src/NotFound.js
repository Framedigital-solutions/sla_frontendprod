import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import notFound from "../src/assets/alarm.png"; // Use same image for consistency

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen mt-5 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src={notFound}
            alt="Not Found"
            className="w-full h-full object-cover md:rounded-l-xl"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center items-center">
          <div className="self-end">
            <X
              className="text-gray-600 cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 text-center mb-6">
            The page you're looking for doesn't exist or was moved.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
