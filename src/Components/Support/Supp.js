import React, { useState, useEffect } from "react";
import { SUPPORT } from "../../config/api.config";
import {
  AlertCircle,
  Send,
  CheckCircle,
  X,
  AlertTriangle,
  Upload,
  Mail,
  MessageSquare,
} from "lucide-react";

const SupportPage = () => {
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketResponse, setTicketResponse] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    typeOfSupport: "",
    subject: "",
    description: "",
    contactDetails: "",
    screenshot: "",
  });

  const supportTypes = [
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payment" },
    { value: "general", label: "General Inquiry" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
  ];

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });
    setTimeout(
      () => setToast({ show: false, type: "", message: "", title: "" }),
      5000
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.typeOfSupport) {
      showToast("error", "Validation Error", "Please select a support type");
      return false;
    }
    if (!formData.subject.trim()) {
      showToast("error", "Validation Error", "Please enter a subject");
      return false;
    }
    if (!formData.description.trim()) {
      showToast("error", "Validation Error", "Please enter a description");
      return false;
    }
    if (!formData.contactDetails.trim()) {
      showToast(
        "error",
        "Validation Error",
        "Please enter your contact details"
      );
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactDetails)) {
      showToast(
        "error",
        "Validation Error",
        "Please enter a valid email address"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        SUPPORT.TICKETS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setTicketResponse(responseData);
        showToast(
          "success",
          "Success!",
          `Ticket submitted successfully. Ticket ID: ${
            responseData.id || "Generated"
          }`
        );
        // Reset form
        setFormData({
          typeOfSupport: "",
          subject: "",
          description: "",
          contactDetails: "",
          screenshot: "",
        });
      } else {
        throw new Error(
          responseData.message ||
            `Server responded with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      showToast(
        "error",
        "Error!",
        error.message || "Failed to submit ticket. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const Toast = ({ show, type, title, message, onClose }) => {
    if (!show) return null;

    const isSuccess = type === "success";
    const bgColor = isSuccess ? "bg-green-500" : "bg-red-500";
    const Icon = isSuccess ? CheckCircle : AlertTriangle;

    return (
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
        <div
          className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">{title}</p>
            <p className="text-sm opacity-90">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() =>
          setToast({ show: false, type: "", message: "", title: "" })
        }
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Support Center</h1>
          <p className="text-orange-100">
            We're here to help you resolve any issues
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Form Header */}
            <div className="bg-orange-500 text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-semibold">
                    Create Support Ticket
                  </h2>
                  <p className="text-orange-100 text-sm">
                    Fill out the form below to submit your support request
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Support Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Type *
                </label>
                <select
                  name="typeOfSupport"
                  value={formData.typeOfSupport}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                >
                  <option value="">Select support type...</option>
                  {supportTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed information about your issue..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
                  required
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="contactDetails"
                    value={formData.contactDetails}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Screenshot URL */}
              <div></div>
            </div>

            {/* Submit Section */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  All fields marked with * are required
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Ticket
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">
            What happens next?
          </h3>
          <ul className="text-orange-700 space-y-1">
            <li>• You'll receive a confirmation email within 5 minutes</li>
            <li>• Our support team will review your ticket within 24 hours</li>
            <li>• We'll contact you via email with updates or solutions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
