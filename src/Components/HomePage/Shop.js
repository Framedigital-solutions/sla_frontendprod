import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../../config/api.config";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoryShowcase = ({ navigateShop }) => {
  const [categories, setCategories] = useState([]);

  const shopNavigationHandler = () => {
    navigateShop();
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        CATEGORIES.ALL
      );

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-28">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img
            src="Category/icon.png"
            alt="Diamond Icon"
            className="w-6 h-6 inline-block"
          />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>

        <h2 className="text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
          Shop By Category
        </h2>
        <p className="text-[#7A3601] uppercase tracking-wide text-sm mt-1">
          OUR EVERYDAY PIECES
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Link
              // onClick={shopNavigationHandler}
              to={`/shop/?category=${encodeURIComponent(category.title)}`}
              className=" relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

              {/* Category Name */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-garamond">{category.title}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryShowcase;
