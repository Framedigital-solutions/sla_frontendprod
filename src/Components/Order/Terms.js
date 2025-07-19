import React from "react";

const Terms = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen px-4 sm:px-8 lg:px-16 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#784421] mb-6 border-b border-[#eee] pb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to Sri Laxmi Alankar! By accessing our website
            (www.srilaxmialankar.com), using our services, or purchasing our
            products, you agree to comply with and be bound by the following
            Terms & Conditions.
          </p>
        </div>

        <Section title="1. Eligibility">
          <List
            items={[
              "Users must be 18 years or older to place an order.",
              "If under 18, parental or guardian consent is required to use the website and place an order.",
            ]}
          />
        </Section>

        <Section title="2. Pricing & Payment">
          <SubSection title="Domestic Orders (India):">
            <List
              items={[
                "Prices are quoted in INR and include GST.",
                "Prices may vary with market rates of gold, diamonds, and gemstones.",
                "Card charges may apply.",
              ]}
            />
          </SubSection>
          <SubSection title="Accepted Payment Methods:">
            <List
              items={[
                "Credit/Debit Cards (Visa, MasterCard, Rupay)",
                "UPI (Google Pay, PhonePe, Paytm)",
                "Net Banking",
                "Bank Transfer (for bulk or custom orders)",
              ]}
            />
          </SubSection>
        </Section>

        <Section title="3. PAN Card Requirement">
          <List
            items={[
              "Mandatory for orders above ₹2 lakhs.",
              "Name on PAN card must match the billing name.",
              "Submit PAN securely via email or website upload.",
            ]}
          />
        </Section>

        <Section title="4. Warranty & Authenticity">
          <List
            items={[
              "All products are BIS hallmarked.",
              "Diamonds/gemstones include an IGI certificate.",
              "Lifetime gold jewelry exchange based on current rates.",
              "Free lifetime polishing and cleaning services.",
              "Free repair for manufacturing defects within 6 months.",
            ]}
          />
        </Section>

        <Section title="5. Cancellation Policy">
          <List
            items={[
              "Orders can be cancelled before dispatch confirmation.",
              "Custom orders cannot be cancelled once processing starts.",
              "To cancel, call: 0621-2245632 or +91-9304907331",
              "Refund are not applicable",
            ]}
          />
        </Section>

        <Section title="6. Privacy & Data Protection">
          <p className="text-gray-700">
            Your personal data is securely stored and encrypted. We only share
            information with payment processors and shipping providers. Read our
            full Privacy Policy for details.
          </p>
        </Section>

        <Section title="7. Governing Law & Jurisdiction">
          <p className="text-gray-700">
            These terms are governed by Indian law. Any disputes will fall under
            the jurisdiction of Muzaffarpur, Bihar.
          </p>
        </Section>

        <Section title="8. Promotions & Offers">
          <List
            items={[
              "Promotions cannot be combined unless specified.",
              "Offer validity is subject to change without notice.",
              "Promo codes must be applied at checkout, not retroactively.",
            ]}
          />
        </Section>

        <Section title="9. Contact Information">
          <List
            items={[
              "Phone: +91 9304907331",
              "Tel: 0621-2245632",
              "Website: www.srilaxmialankar.com",
              "Store Address: Beside of Baba Garibnath Mandir, Muzaffarpur - 842001",
            ]}
          />
        </Section>

        <Section title="10. Changes to Terms & Conditions">
          <p className="text-gray-700">
            Sri Laxmi Alankar reserves the right to update these Terms &
            Conditions at any time without prior notice. Please review them
            regularly.
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

const SubSection = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-medium text-[#5a3720] mb-2">{title}</h3>
    <div className="text-gray-700 text-[16px] leading-relaxed">{children}</div>
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc pl-5 text-gray-700 space-y-2">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

export default Terms;
