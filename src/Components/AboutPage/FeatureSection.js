import React from 'react';
import { FaEye, FaTools, FaGem, FaCrosshairs } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      title: "Our Vision",
      description: "To redefine elegance by offering jewelry that seamlessly blends tradition with innovation.",
      Icon: FaEye
    },
    {
      title: "Our Craftsmanship",
      description: "Our collections are a testament to the skill and dedication of our artisans, who pourtheir heart and soul into every piece. Using only the finest materials, including gold, diamonds, and precious gemstones, we ensure that each item is not only stunningbut also of the highest quality. ",
      Icon: FaTools
    },
    {
      title: "Our Collections",
      description: "From traditional designs that pay homage to our cultural roots to modern pieces that cater to contemporary tastes, our diverse range of jewelry is designed to suit everyoccasion and style.",
      Icon: FaGem
    },
    {
      title: "Our Mission",
      description: "To be your most trusted jewelry partner for all occasions..",
      Icon: FaCrosshairs
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-16 rounded-lg">
          {features.map((feature, index) => {
            const IconComponent = feature.Icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-64 flex-shrink-0"
              >
                <div className="flex flex-col items-center p-6 h-full">
                  <div className="mb-4 text-center">
                    <IconComponent className="text-yellow-600 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-brown font-bold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-black font-brown leading-relaxed text-center text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;