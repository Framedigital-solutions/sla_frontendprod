import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../../api/BlogService";
import LoadingSpinner from "../Common/LoadingSpinner";
import { BiArrowBack } from "react-icons/bi";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!blog) return <div className="text-center py-8">Blog not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center text-orange-600 mb-6 hover:text-orange-700"
        >
          <BiArrowBack className="mr-2" />
          Back to Blogs
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>
                Published: {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="mx-2">•</span>
              <span>
                Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
