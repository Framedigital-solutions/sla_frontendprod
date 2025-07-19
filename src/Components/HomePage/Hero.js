import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backend.srilaxmialankar.com/crousel/"
        );
        const data = await response.json();

        console.log("carousel data", data);

        // Extract image URLs from data
        const images = data.map((item) => item.image);
        setCarouselImages(images);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (carouselImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [carouselImages]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div
      className="relative h-[80vh] md:h-screen flex items-center justify-center bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${carouselImages[currentIndex] || "home.png"})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-96 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-garamond uppercase text-[#6E3000] leading-tight">
          UNIQUE AND AUTHENTIC VINTAGE <br />
          <span>DESIGNER JEWELLERY</span>
        </h1>
        <p className="mt-4 text-md sm:text-lg md:text-xl font-garamond text-[#8B572A] font-bold tracking-wide">
          NOW AVAILABLE AT THE SRI Alankar
        </p>
        <button
          className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-[#8B572A] font-bold text-white rounded-full 
                     hover:bg-[#6E3000] transition-shadow shadow-md"
        >
          DISCOVER THE COLLECTION
        </button>
      </div>

      {/* Navigation Buttons */}
      {carouselImages.length > 1 && (
        <>
          <button
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full"
            onClick={handlePrev}
          >
            ⬅
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full"
            onClick={handleNext}
          >
            ➡
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {carouselImages.length > 1 && (
        <div className="absolute bottom-4 flex space-x-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-orange-500 w-4 sm:w-5"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
