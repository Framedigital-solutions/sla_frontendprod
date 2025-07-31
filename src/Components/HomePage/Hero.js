import React, { useState, useEffect, useCallback } from "react";
import { OTHER } from "../../config/api.config";

// Optimized fallback images
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1611591437281-460914d4447e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

// Preload image function
const preloadImage = (url) => {
  const img = new Image();
  img.src = url;
  return img.complete ? Promise.resolve() : new Promise((resolve) => img.onload = resolve);
};

const HeroSection = () => {
  const [carouselImages, setCarouselImages] = useState(FALLBACK_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      let response = await fetch(OTHER.CAROUSEL);
      
      // If that fails, try with the typo-fixed version
      if (!response.ok) {
        response = await fetch(OTHER.CAROUSEL.replace('crousel', 'carousel'));
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch carousel images');
      }
      
      const data = await response.json();
      const images = data?.map(item => item.image).filter(Boolean) || FALLBACK_IMAGES;
      
      // Preload all images
      await Promise.all(images.map(preloadImage));
      
      setCarouselImages(images.length ? images : FALLBACK_IMAGES);
    } catch (error) {
      console.error("Error loading images:", error);
      setCarouselImages(FALLBACK_IMAGES);
    }
  }, []);

  useEffect(() => { 
    fetchImages(); 
  }, [fetchImages]);

  // Auto-rotate with smooth transitions
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [carouselImages.length]);

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
    <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${carouselImages[currentIndex]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
          <div className="text-center max-w-5xl mx-auto px-8 py-12 sm:px-12">
            {/* Decorative elements */}
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-8 h-1 bg-gold-500"></div>
              <div className="w-4 h-1 bg-gold-500"></div>
              <div className="w-2 h-1 bg-gold-500"></div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-bold text-white leading-tight mb-4">
              <span className="block text-amber-300 text-2xl sm:text-3xl md:text-4xl font-light tracking-widest mb-2">UNIQUE & AUTHENTIC</span>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-transparent bg-clip-text">DESIGNER JEWELLERY</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-amber-100 font-light mb-8 tracking-wider">
              NOW AT <span className="font-medium text-amber-50">SRI LAXMI ALANKAR</span>
            </p>
            
            <button
              className="relative px-14 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-medium rounded-sm 
                       hover:from-amber-600 hover:to-amber-800 transition-all duration-300 transform hover:scale-105
                       border border-amber-300 shadow-lg hover:shadow-2xl hover:shadow-amber-900/40 text-lg uppercase tracking-wider
                       group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">EXPLORE COLLECTION</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            
            <div className="absolute bottom-8 right-8 text-right">
              <p className="text-sm text-amber-200 font-medium tracking-wider">Exquisite Handcrafted Jewelry</p>
              <p className="text-sm font-bold text-amber-300 mt-1">— Since 1995 —</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {carouselImages.length > 1 && (
          <>
            <button
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              ⬅
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full"
              onClick={handleNext}
              aria-label="Next slide"
            >
              ➡
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {carouselImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-amber-400 w-4 sm:w-5"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
