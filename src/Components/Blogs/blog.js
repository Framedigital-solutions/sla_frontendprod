import React, { useEffect, useState } from "react";
import Carousel from "./Crousel";
import GallerySection from "./Card";
import Item from "./BlogItem";
import { getAllBlogs } from "../../api/BlogService";
import LoadingSpinner from "../Common/LoadingSpinner"; // You'll need to create this component

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        Error loading blogs: {error}
      </div>
    );
  if (!blogs?.length)
    return (
      <div className="text-center py-8">No blogs available at the moment.</div>
    );

  return (
    <div>
      <Carousel />
      <Item blogs={blogs} />
      <GallerySection blogs={blogs} />
    </div>
  );
};

export default Blog;
