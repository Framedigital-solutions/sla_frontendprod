import React, { useState, useEffect } from "react";
import { OTHER } from "../../config/api.config";

const TestimonialsComponent = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          OTHER.TESTIMONIALS
        );
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating = 5) => (
    <div className="flex justify-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (testimonials.length === 0) {
    return <div className="text-center my-10">Loading testimonials...</div>;
  }

  return (
    <div className="w-full mt-16">
      {/* Title Section */}
      <div className="text-center mb-12 px-6">
        <div className="flex items-center justify-center space-x-4 mb-3">
          <div className="w-20 h-px bg-gray-300"></div>
          <img
            src="/Category/icon.png"
            alt="Diamond Icon"
            className="w-8 h-8 inline-block"
          />
          <div className="w-20 h-px bg-gray-300"></div>
        </div>
        <h2 className="text-5xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text font-bold">
          Our Customers
        </h2>
      </div>

      {/* Carousel */}
      <div className="w-full bg-[#FDF8F3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial._id} className="w-full flex-shrink-0">
                      <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                          <span className="text-7xl text-[#B45309] font-serif">
                            "
                          </span>
                        </div>
                        <p className="text-gray-800 text-2xl italic mb-12 leading-relaxed font-light tracking-wide">
                          {testimonial.message}
                        </p>
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-semibold text-gray-900 uppercase mb-2 text-lg tracking-wider">
                            {testimonial.name}
                          </p>
                          {renderStars()}
                          <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                  i === currentSlide
                                    ? "bg-[#B45309]"
                                    : "bg-gray-300"
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white"
            >
              <svg
                className="w-8 h-8 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white"
            >
              <svg
                className="w-8 h-8 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;
