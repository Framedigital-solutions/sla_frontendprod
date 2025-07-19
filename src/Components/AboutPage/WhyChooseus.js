import React from 'react';
import { FaGem, FaPaintBrush, FaUserTie, FaTag, FaHandshake } from 'react-icons/fa';

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Authenticity You Can Trust",
      description: "All our gold, diamond, and precious gemstone jewelry is certified for authenticity, ensuring that you receive only the finest quality pieces. Our strict adherence to purity standards means every purchase comes with the assurance of transparency and integrity.",
      Icon: FaGem
    },
    {
      title: "Exquisite Craftsmanship & Timeless Designs",
      description: "Our artisans pour their skill, passion, and expertise into every piece we create. From intricately designed bridal sets to modern, minimalist styles, each item is handcrafted with precision and care to ensure flawless beauty and durability.",
      Icon: FaPaintBrush
    },
    {
      title: "Personalized Service & Expert Guidance",
      description: "Our team of highly knowledgeable jewelry experts is dedicated to helping you find the ideal piece that complements your style, budget, and occasion. We provide personalized attention every step of the way.",
      Icon: FaUserTie
    },
    {
      title: "Luxury Within Reach – Competitive Pricing",
      description: "We offer competitive pricing without compromising on quality. By maintaining strong relationships with trusted suppliers and following efficient business practices, we ensure that you receive exceptional value for your investment.",
      Icon: FaTag
    },
    {
      title: "A Legacy of Trust & Commitment",
      description: "With years of experience in the jewelry industry, we have built a reputation for honesty, reliability, and excellence. When you choose Shri Laxmi Alankar, you're not just buying jewelry—you're becoming part of a tradition.",
      Icon: FaHandshake
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-garmond font-bold text-gray-900 mb-4">
            Why Choose Shri Laxmi Alankar?
          </h2>
          <p className="text-xl font-garmond text-gray-600 mb-6">
            Your Trusted Jewelry Partner for Every Special Occasion
          </p>
          <p className="text-lg font-garmond text-gray-600 max-w-3xl mx-auto">
            At Shri Laxmi Alankar, we believe that jewelry is more than just an accessory—it's an expression of love, tradition, and timeless elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.Icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <IconComponent className="text-yellow-600 text-4xl mx-auto" />
                </div>
                <h3 className="text-xl font-garmond font-semibold text-gray-900 mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-garmond text-center">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl font-garmond font-bold text-black max-w-3xl mx-auto">
            Visit us today and experience the beauty, authenticity, and personalized service that sets us apart.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;