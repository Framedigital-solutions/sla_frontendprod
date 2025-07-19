import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../api/BlogService";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        // Get only the latest 3 blogs
        const latestBlogs = data.slice(0, 3);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return null; // Or show a loading spinner
  if (!blogs.length) return null;

  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <div className="w-16 h-px bg-gray-300"></div>
          <img src="Category/icon.png" alt="Diamond Icon" className="w-6 h-6 inline-block" />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>

        <h2 className="text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text">
          From Our Blogs
        </h2>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="group">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="absolute bottom-4 left-4 flex items-center gap-2 text-white border border-white px-4 py-2 rounded-full">
                  <span>➜</span> READ MORE
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold font-garamond">{blog.title}</h3>
              <p className="font-bold text-sm mt-1 font-brown text-[#7A3838]">
                {blog.content.substring(0, 100)}...
              </p>
              <div className="flex gap-2 mt-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
