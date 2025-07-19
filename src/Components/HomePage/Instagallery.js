import React, { useEffect, useState } from "react";

const InstagramGallery = () => {
  const [images, setImages] = useState([]);

  const fetchInstagramImages = async () => {
    try {
      const response = await fetch(
        "https://backend.srilaxmialankar.com/instagram"
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch Instagram posts:", error);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchInstagramImages();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Follow Us On Instagram
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((post, index) => (
          <div key={post._id} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={post.image}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramGallery;
