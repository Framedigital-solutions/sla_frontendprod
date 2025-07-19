import React, { useEffect, useState } from "react";

const HeroComponent = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://backend.srilaxmialankar.com/shop"
        );
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 3500); // Change slide every 4 seconds
      return () => clearInterval(interval);
    }
  }, [slides]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative h-[500px] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url('${currentSlide?.image || "default.jpg"}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-end md:items-end lg:items-end items-center p-4 md:p-8 text-white text-center md:text-right lg:text-right lg:mr-96">
        <h2 className="text-md md:text-lg font-medium">
          {currentSlide?.subTitle || "New Arrival"}
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          {currentSlide?.title || "Shop Elegant Chains"}
        </h1>
        <p className="max-w-xs md:max-w-sm mb-4 md:mb-6">
          {currentSlide?.description ||
            "Discover timeless beauty with our latest collection."}
        </p>
        <button className="px-4 md:px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition duration-200">
          Shop Now
        </button>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full"
          >
            ⬅
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full"
          >
            ➡
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 flex space-x-2 justify-center w-full">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-orange-400 w-3" : "bg-gray-300"
              } transition-all`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroComponent;
