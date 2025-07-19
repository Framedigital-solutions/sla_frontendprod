import React from "react";

const BestSelling = () => {
  const categories = [
    { name: "Bracelets", image: "Category/6.png" },
    {
      name: "Chains",
      image: "Category/1.png",
      labels: [
        { text: "Gold", icon: "★", color: "text-yellow-500" },
        { text: "Platinum", icon: "✦", color: "text-blue-400" },
      ],
    },
    { name: "Earrings", image: "Category/2.png" },
    { name: "Neckwears", image: "Category/3.png" },
    { name: "Pendants", image: "Category/4.png" },
    { name: "Rings", image: "Category/5.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-28">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Icon and Line */}
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img src="Category/icon.png" alt="Diamond Icon" className="w-6 h-6 inline-block" />

          <div className="w-16 h-px bg-gray-300"></div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
  Shop By Category
</h2>


        {/* Subtitle */}
        <p className="text-[#7A3601] uppercase tracking-wide text-sm mt-1">
          OUR EVERYDAY PIECES
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="relative group cursor-pointer overflow-hidden">
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-70 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

            {/* Category Name */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-garamond">{category.name}</h3>
            </div>

            {/* Labels (only for Chains) */}
            {category.labels && (
              <div className="absolute top-4 left-4 backdrop-blur-sm bg-white/30 border border-gray-300 px-4 py-3 rounded-lg shadow-md">
                {category.labels.map((label, labelIndex) => (
                  <div key={labelIndex} className="flex items-center space-x-2 mb-2 last:mb-0">
                    <span className={label.color} style={{ fontSize: "28.93px" }}>
                      {label.icon}
                    </span>
                    <span
                      className="text-gray-800 font-garamond font-medium underline"
                      style={{ fontSize: "28.93px" }}
                    >
                      {label.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-[#E86A1E]" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default BestSelling;
