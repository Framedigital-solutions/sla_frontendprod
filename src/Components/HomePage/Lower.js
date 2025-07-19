import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "sh2.png",
      title: "ALL INDIA SHIPPING",
      description: "All India Shipping is the Process of Importing",
    },
    {
      id: 2,
      icon: "sh1.png",
      title: "SECURED SERVICE",
      description: "Secured Services. Heavy Commercial/Industrial",
    },
    {
      id: 3,
      icon: "dl.png",
      title: "SECURED SERVICE",
      description: "Fast Delivery is a Fast Growing and Promising",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Grid for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col items-center text-center bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-transform duration-300 hover:scale-105
              ${index === 1 ? "md:mt-20" : ""}`} // Push middle card down only on larger screens
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-16 w-16 mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2 font-brown uppercase tracking-wide">
                {feature.title} 
              </h3>
              <p className="text-[16px] font-medium font-brown">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
