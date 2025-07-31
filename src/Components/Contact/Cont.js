import React, { useState, useEffect } from "react";
import { SUPPORT } from "../../config/api.config";
import contact from "../../assets/contact.jpg";

const Cont = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    contactEmail: "",
    phoneNumber: "",
    supportQuery: "",
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [supportQueries, setSupportQueries] = useState([]);
  const [isLoadingQueries, setIsLoadingQueries] = useState(false);

  // API base URL
  const API_BASE_URL = SUPPORT.CREATE_TICKET;

  // Fetch existing support queries on component mount
  useEffect(() => {
    fetchSupportQueries();
  }, []);

  // Fetch support queries from API
  const fetchSupportQueries = async () => {
    setIsLoadingQueries(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSupportQueries(data.abouts || []);
      } else {
        console.error("Failed to fetch support queries");
      }
    } catch (error) {
      console.error("Error fetching support queries:", error);
    } finally {
      setIsLoadingQueries(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.contactEmail ||
      !formData.supportQuery
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus("success");

        // Clear form
        setFormData({
          fullName: "",
          contactEmail: "",
          phoneNumber: "",
          supportQuery: "",
        });

        // Refresh support queries list
        await fetchSupportQueries();

        console.log("Support query submitted successfully:", data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to submit support query:", errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting support query:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            {/* Contact Us Section */}
            <div>
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src={contact}
                    alt="Contact Us"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                  />
                  <h1 className="font-manrope text-white text-3xl sm:text-4xl font-bold leading-10 absolute top-6 sm:top-11 left-6 sm:left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full px-4 sm:px-5 lg:px-11 py-6">
                    <div className="bg-white rounded-lg p-6">
                      {/* Contact Information */}
                      <a
                        href="tel:4706011911"
                        className="flex items-center mb-6"
                      >
                        <h5 className="text-black text-base sm:text-lg font-normal leading-6 ml-4 sm:ml-5">
                          +919304907331
                        </h5>
                      </a>
                      <a
                        href="mailto:Pagedone1234@gmail.com"
                        className="flex items-center mb-6"
                      >
                        <h5 className="text-black text-base sm:text-lg font-normal leading-6 ml-4 sm:ml-5">
                          Laxmialankar74@gmail.com
                        </h5>
                      </a>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=654+Sycamore+Avenue+Meadowville+WA+76543"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <h5 className="text-black text-base sm:text-lg font-normal leading-6 ml-4 sm:ml-5">
                          Garib Asthan Rd, near Garib asthan temple, Musahri,
                          Muzaffarpur, Bihar 842001
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-gray-50 p-5 sm:p-8 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <h2 className="text-yellow-500 font-bold font-manrope text-2xl sm:text-4xl leading-10 mb-8 sm:mb-11">
                Send Us A Message
              </h2>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Your message has been sent successfully! We'll get back
                        to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        Failed to send message. Please check all required fields
                        and try again.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm sm:text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 pl-4 mb-6 sm:mb-10"
                  placeholder="Full Name *"
                  required
                />
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm sm:text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 pl-4 mb-6 sm:mb-10"
                  placeholder="Email Address *"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm sm:text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 pl-4 mb-6 sm:mb-10"
                  placeholder="Phone Number"
                />
                <textarea
                  name="supportQuery"
                  value={formData.supportQuery}
                  onChange={handleInputChange}
                  className="w-full h-24 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-sm sm:text-lg font-normal leading-7 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 p-4 mb-6 sm:mb-10 resize-none"
                  placeholder="Your Message *"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-12 text-white text-sm sm:text-base font-semibold leading-6 rounded-full transition-all duration-700 shadow-sm ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "hover:bg-yellow-500 bg-yellow-600"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: Display recent support queries (for admin view) */}
      {supportQueries.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Recent Support Queries
            </h3>
            {isLoadingQueries ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                <p className="mt-2 text-gray-600">Loading queries...</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {supportQueries.slice(0, 6).map((query) => (
                  <div
                    key={query._id}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {query.fullName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {query.contactEmail}
                    </p>
                    {query.phoneNumber && (
                      <p className="text-sm text-gray-600 mb-3">
                        {query.phoneNumber}
                      </p>
                    )}
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {query.supportQuery}
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                      {new Date(query.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Cont;
