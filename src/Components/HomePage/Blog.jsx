import React from "react";

const BlogCards = () => {
  const blogs = [
    {
      title: "For Elegance",
      description: "Involving Belonging Promotion Provision Can Be Consulted.",
      image: "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694", // Replace with actual image
    },
    {
      title: "Product Superiority",
      description:
        "Ladyship graciously embraced the blessing as she met Sir with charm.",
      image: "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694", // Replace with actual image
    },
    {
      title: "Skillfully Designed",
      description:
        "As cousins and men gathered, warmth filled the assembly.",
      image: "https://www.dazzlesjewellery.in/cdn/shop/files/IMG_9798_0af72cbf-a031-4900-8c47-96cfa781b91d.jpg?v=1720172694", // Replace with actual image
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      {/* Centered Wrapper */}
      <div className="text-center w-full max-w-7xl">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600 uppercase">
            From Our Blogs
          </h2>
          <div className="flex justify-center mt-2">
            <span className="w-8 h-1 bg-gray-300 block"></span>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto px-4 max-w-6xl">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute bottom-4 left-4 px-4 py-2 bg-black bg-opacity-50 text-white text-sm uppercase font-medium rounded-md shadow-lg transition duration-300 hover:bg-opacity-75">
                  Learn More
                </button>
              </div>

              {/* Content Section */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
