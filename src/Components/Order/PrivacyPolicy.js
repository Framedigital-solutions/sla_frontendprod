import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#784421] mb-6 border-b border-[#eee] pb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Sri Laxmi Alankar is committed to protecting the privacy and
            security of our customers. This Privacy Policy outlines how we
            collect, use, store, and disclose your personal information when you
            interact with us through our website or services.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <List
            items={[
              "Full Name",
              "Contact Information (Email, Phone Number)",
              "Billing and Shipping Address",
              "Payment Information (processed via secure third-party services)",
              "Purchase History",
              "Communication records (for customer support)",
            ]}
          />
          <p className="text-gray-700 mt-2">
            We also collect non-personal data like browser type, IP address,
            device information, and cookies for analytics and service
            improvement.
          </p>
        </Section>

        <Section title="2. Use of Information">
          <List
            items={[
              "Processing and fulfilling your orders",
              "Communicating order updates and customer support",
              "Enhancing your shopping experience",
              "Sending promotional offers and newsletters (only with consent)",
              "Internal analysis and website improvement",
            ]}
          />
        </Section>

        <Section title="3. Information Sharing">
          <p className="text-gray-700">
            We do not sell, rent, or trade your personal information with third
            parties for marketing purposes. Information may be shared with:
          </p>
          <List
            items={[
              "Delivery partners to ensure successful shipping",
              "Payment processors for transaction completion",
              "Legal authorities if required by law or to prevent fraud",
            ]}
          />
        </Section>

        <Section title="4. Data Security">
          <p className="text-gray-700">
            We implement advanced security protocols and encryption techniques
            to ensure that your personal data is protected against unauthorized
            access, misuse, or disclosure.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p className="text-gray-700">
            Our website uses cookies to personalize your experience and analyze
            traffic. You can control cookie settings through your browser
            preferences.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p className="text-gray-700">
            You may request to review, correct, or delete your personal
            information at any time by contacting our support team. You can also
            opt out of promotional communications by clicking the "unsubscribe"
            link in our emails.
          </p>
        </Section>
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-[#784421]">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

export default PrivacyPolicy;
