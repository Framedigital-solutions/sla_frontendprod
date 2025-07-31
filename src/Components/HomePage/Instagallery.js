import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { InstagramOutlined, HeartFilled, MessageFilled } from "@ant-design/icons";

// Local Instagram posts using images from public/Instagram directory
const INSTAGRAM_IMAGES = Array.from({ length: 12 }, (_, i) => `3${i + 1}.png`);

const InstagramGallery = () => {
  const [isLoading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const posts = INSTAGRAM_IMAGES.slice(0, 6).map((img, index) => ({
    id: index + 1,
    image: `/Instagram/${img}`,
    likes: Math.floor(Math.random() * 100) + 20,
    comments: Math.floor(Math.random() * 20) + 1,
    caption: [
      'Handcrafted Gold',
      'Diamond Collection',
      'Gold Necklaces',
      'Traditional Designs',
      'Bridal Collection',
      'Trending Now'
    ][index % 6]
  }));

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <InstagramOutlined className="text-3xl text-pink-500 mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Follow Us On Instagram
          </h2>
          <p className="text-gray-600">@sri_laxmialankar</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href="https://www.instagram.com/sri_laxmialankar/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 text-white">
                  <span className="flex items-center">
                    <HeartFilled className="mr-1" /> {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageFilled className="mr-1" /> {post.comments}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;