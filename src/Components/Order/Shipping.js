import React from "react";

const Shipping = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#784421] mb-6 border-b border-[#eee] pb-4">
            Shipping and Return Policy
          </h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#784421] mb-3">
              Committed to Quality, Crafted with Care
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At SriLaxmi Alankar, every piece of jewelry is a symbol of
              tradition, precision, and trust. As part of our commitment to
              customer satisfaction and operational transparency, this policy
              outlines our practices related to shipping and returns for
              domestic orders across India.
            </p>
          </div>
        </div>

        {/* Shipping Policy */}
        <Section title="SHIPPING POLICY">
          <p className="text-[#5a3720] font-medium text-lg mb-4">
            Secure, Reliable, and Timely Delivery Across India
          </p>

          <SubSection title="Order Confirmation & Processing">
            <p className="text-gray-700 mb-3">Once your order is placed:</p>
            <List
              items={[
                "You will receive a confirmation message via email or SMS.",
                "Our team will begin processing your order within 24 to 48 business hours (excluding Sundays and public holidays).",
                "All items are thoroughly inspected and securely packaged before dispatch.",
              ]}
            />
          </SubSection>

          <SubSection title="Delivery Timeline">
            <List
              items={[
                "Standard Delivery: 5 to 7 days after dispatch, depending on your location.",
                "Express Delivery: Available in select Indian cities for an additional fee. To check availability, please contact our customer support team.",
                "Free Shipping: Applicable on all orders above ₹1,00,000.",
              ]}
            />
          </SubSection>

          <SubSection title="Tracking">
            <p className="text-gray-700">
              Once shipped, you will receive a shipment tracking number to
              monitor your order in real time.
            </p>
          </SubSection>
        </Section>

        {/* Custom Orders */}
        <Section title="CUSTOM ORDER SHIPPING">
          <p className="text-[#5a3720] font-medium text-lg mb-4">
            Tailored Craftsmanship, Delivered with Precision
          </p>
          <p className="text-gray-700 mb-3">
            For personalized or made-to-order jewelry:
          </p>
          <List
            items={[
              "A 25% advance payment is required at the time of confirmation.",
              "Delivery timelines range from 5 to 10 days, based on the design and material availability.",
              "Our team will update you at every stage of production, ensuring transparency and timely delivery.",
            ]}
          />
        </Section>

        {/* Important Notes */}
        <Section title="Important Notes">
          <List
            items={[
              "We do not accept returns for reasons such as change of mind, personal preference, or minor color/weight variations.",
              "Customized, engraved, resized, or altered products are strictly non-returnable.",
            ]}
          />
        </Section>

        {/* Cancellation */}
        <Section title="CANCELLATION POLICY">
          <p className="text-[#5a3720] font-medium text-lg mb-4">
            Order Cancellations Must Be Prompt
          </p>
          <List
            items={[
              "Orders may be canceled only if they have not yet been shipped.",
              "To cancel, please contact our support team immediately after placing your order.",
              "Once dispatched, the order cannot be canceled or modified.",
            ]}
          />
        </Section>

        {/* Contact */}
        <Section title="CONTACT US">
          <p className="text-[#5a3720] font-medium text-lg mb-4">
            Have a question or need help with your order?
          </p>
          <p className="text-gray-700 mb-4">
            Our dedicated team is always here to assist you.
          </p>
          <div className="bg-[#FAF7F2] p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactItem label="Phone" value="+91-9304907331" />
              <ContactItem label="Website" value="www.srilaxmialankar.com" />
              <ContactItem
                label="Store Address"
                value="Beside Garibnath Mandir, Muzaffarpur, Bihar – 842001"
                fullWidth
              />
              <ContactItem
                label="Support Hours"
                value="10:00 AM to 7:00 PM (Closed on Sundays)"
                fullWidth
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-[#784421] border-b border-[#eee] pb-2">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const SubSection = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-medium text-[#5a3720]">{title}</h3>
    <div className="text-gray-700 text-[16px] leading-relaxed">{children}</div>
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="leading-relaxed">
        {item}
      </li>
    ))}
  </ul>
);

const ContactItem = ({ label, value, fullWidth }) => (
  <div className={`${fullWidth ? "md:col-span-2" : ""}`}>
    <p className="font-medium text-[#5a3720] mb-1">{label}:</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

export default Shipping;
