import React from "react";

const StyledSection = () => {
  // Content data defined as an object
  const content = {
    heading: "Discover a World of Exquisite Jewelry",
    paragraphs: [
      `At Shri Laxmi Alankar, we believe jewelry is more than an accessory—it’s a statement, a keepsake, and a legacy. Explore our wide range of collections, thoughtfully designed to cater toevery taste and occasion..`,
    ],
    bulletPoints: [
      "Gold Symphony Collection-",
      "Diamond Sparkle Collection-",
      "Silver Elegance Collection-",
        "The Artisan’s Touch",
        "Festive Radiance Collection",
        "Heritage Heirlooms"
    ],
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 font-sans">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-brown uppercase tracking-wide text-black">
        {content.heading}
      </h1>

      {/* Paragraphs */}
      {content.paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-black leading-relaxed  font-garamond text-md sm:text-base md:text-lg"
        >
          {paragraph}
        </p>
      ))}

      {/* Bullet Points */}
      <ul className="space-y-2 text-black list-disc list-inside sm:ml-4 md:ml-8">
        {content.bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default StyledSection;
