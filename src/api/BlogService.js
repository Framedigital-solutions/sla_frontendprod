// const BASE_URL = 'https://backend.srilaxmialankar.com/blog';

// const BASE_URL = "https://backend.srilaxmialankar.com/blog";
const BASE_URL = "https://backend.srilaxmialankar.com/blog";

export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw new Error(`${error.message}`);
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error(`${error.message}`);
  }
};
