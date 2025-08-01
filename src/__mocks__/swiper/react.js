import React from 'react';

const Swiper = ({ children, ...props }) => {
  return <div data-testid="swiper-mock" {...props}>{children}</div>;
};

const SwiperSlide = ({ children, ...props }) => {
  return <div data-testid="swiper-slide-mock" {...props}>{children}</div>;
};

export { Swiper, SwiperSlide };
export default Swiper;
