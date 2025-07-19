import React from "react";

// Sample JSON data (you can replace this with a fetch request if necessary)
const jewelryData = [
  {
    id: 1,
    name: "Gold Bangles",
    category: "Bangles",
    image:
      "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694",
  },
  {
    id: 2,
    name: "Diamond Ring",
    category: "Ring",
    image:
      "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694",
  },
  {
    id: 3,
    name: "Sapphire Ring",
    category: "Ring",
    image:
      "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694",
  },
  {
    id: 4,
    name: "Silver Chain",
    category: "Chain",
    image:
      "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694",
  },
];

const JewelryStoreAd = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Hearts decorations */}
      <div className="relative">
        <div className="absolute -top-8 left-0 right-0">
          <div className="flex justify-around">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="text-pink-200 transform rotate-45 opacity-70"
              >
                ❤
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left side - Gift banner */}
        <div className="col-span-2 lg:col-span-1 bg-zinc-800 text-white p-8 rounded-lg relative overflow-hidden">
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              Hinipanna
            </span>
          </div>

          <div
            className="mt-12 bg-cover bg-center relative h-60"
            style={{
              backgroundImage: `url('https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694')`,
            }}
          >
            {/* Optional background overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 text-white flex flex-col items-center justify-center min-h-screen text-center px-4">
              <h2 className="text-2xl font-bold mb-2">Find Your</h2>
              <h1 className="text-4xl font-bold mb-4">Perfect Gift</h1>
              <p className="text-sm mb-6 max-w-lg mx-auto">
                Find your perfect gift for every person you love any budget and
                occasion.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
                SHOP NOW
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 right-0">
            <span className="text-yellow-300 text-2xl">✨</span>
          </div>
        </div>

        {/* Right side - Product grid */}
        <div className="col-span-2 lg:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {jewelryData.map((product) => (
              <div
                key={product.id}
                className="border border-amber-200 p-4 rounded-lg"
              >
                <div className="aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <p className="text-center text-gray-800">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="col-span-2 bg-gray-50 p-8 rounded-lg relative">
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-2">SILVA RING</h2>
            <p className="text-gray-600 text-sm">PREMIUM JEWELRY</p>
          </div>

          <div className="mt-4 flex justify-center">
            <img
              src="https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694"
              alt="Premium Ring"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Decorative hearts */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="text-pink-200 transform rotate-45 opacity-70"
              >
                ❤
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryStoreAd;
