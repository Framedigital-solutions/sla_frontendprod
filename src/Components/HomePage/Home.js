import Features from "./Bottom";
import ContactSection from "./Contact";
import DiamondRingHero from "./Diamond";
import JewelryShowcase from "./EveryDay";
import FeatureProducts from "./Feaur";
import HeroSection from "./Hero";
import InstagramGallery from "./Instagallery";
import JewelryGrid from "./JewelleyGrid";
import ProductSelling from "./ProductSelling";
import FeaturesSection from "./Lower";
import CategoryShowcase from "./Shop";
import BlogSection from "./BlogSection";

import TestimonialsComponent from "./Testimonial";
import GoldPrices from "./GoldPrices";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToShopHandler = () => {
    navigate("/shop");
  };

  return (
    <div>
      <HeroSection />
      {/* <FeaturesSection /> */}
      <GoldPrices />

      <JewelryGrid />
      <CategoryShowcase navigateShop={navigateToShopHandler} />
      <JewelryShowcase navigateShop={navigateToShopHandler} />
      <FeatureProducts navigateShop={navigateToShopHandler} />
      <TestimonialsComponent />
      <DiamondRingHero />
      <ProductSelling navigateShop={navigateToShopHandler} />
      {/* <JewelryShowcases/> */}
      <BlogSection />
      <InstagramGallery />
      <Features />
      <ContactSection />
    </div>
  );
};

export default Home;
