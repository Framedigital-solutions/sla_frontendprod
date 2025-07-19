import React from "react";

const FullWidthImageWithText = () => {
  // Content data defined in the same file
  const content = {
    imageSrc: "https://etimg.etb2bimg.com/photo/106418496.cms",
    imageAlt: "Full width image",
    mainText: "Preserve the Beauty of Your Precious Jewelry",
    subText: "Your jewelry is more than just an accessory—it is a treasured investment and a reflection of your personal style. To maintain its brilliance and longevity,proper care and maintenance are essential.",
  };

  return (
    <div className="relative w-full h-screen">
      {/* Image with Dark Overlay */}
      <img
        src={content.imageSrc}
        alt={content.imageAlt}
        className="w-full h-full object-cover"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 sm:px-8 md:px-16">
        {/* Main Text */}
        <p className="leading-relaxed text-2xl sm:text-2xl md:text-4xl uppercase font-[DancingScript]">
          {content.mainText.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        
        {/* Subtext */}
        <div className="max-w-full mt-3">
          <span className="text-sm mt-4 sm:text-lg italic md:text-2xl uppercase font-[DancingScript]">
            {content.subText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FullWidthImageWithText;
