import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../CartContext";

import ProductLoader from "./ProductLoader";
import { userStore } from "../../../store/userStore";
import toast, { Toaster } from "react-hot-toast";

const alertLoginHandler = () => toast.error("User needs to Login First!");

const ProductDetailComplete = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [shopDetails, setShopDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const userid = userStore((state) => state._id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/gold/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.coverImage || data.images?.[0] || "");
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchShopDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/shopdetails`
        );
        if (!response.ok) throw new Error("Failed to fetch shop details");
        const data = await response.json();
        setShopDetails(data[0]);
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    const fetchRelatedProducts = async () => {
      setLoadingRelated(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/related/`
        );
        if (!response.ok) throw new Error("Failed to fetch related products");
        const data = await response.json();
        setRelatedProducts(data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchProduct();
    fetchShopDetails();
    fetchRelatedProducts();
  }, [productId]);

  const handleAddToCart = () => {
    console.log("userid " + userid);
    if (!userid) {
      console.log("inside if");
      return alertLoginHandler();
    }
    const productToAdd = {
      userId: userid,
      productId: productId,
      quantity: 1,
    };
    addToCart(productToAdd);
    navigate("/cart");
  };

  const handleRelatedProductClick = (relatedProduct) => {
    // Navigate to related product or handle click
    console.log("Related product clicked:", relatedProduct);
    // You can navigate to a product detail page or show more info
    // navigate(`/product/${relatedProduct._id}`);
  };

  if (loading) return <ProductLoader />;

  if (!product)
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">Product not found</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Return to Products
        </button>
      </div>
    );

  const dynamicDescriptionData = shopDetails
    ? [
        { name: "Model", value: shopDetails.modelNumber },
        { name: "Style", value: shopDetails.style },
        { name: "Certificate", value: shopDetails.certificate },
        { name: "Size", value: shopDetails.goldPurity },
        { name: "Total Weight", value: shopDetails.totalWeight },
        {
          name: "Set Includes",
          value: shopDetails.setIncludes?.join(", "),
        },
        {
          name: "Occasion",
          value: shopDetails.occasion?.join(", "),
        },
        {
          name: "Design Theme",
          value: shopDetails.designTheme?.join(", "),
        },
        { name: "Finish", value: shopDetails.finish },
      ]
    : [];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/shop")}
        className="p-4 flex items-center text-gray-600 hover:text-yellow-600 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </button>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Images */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex justify-center">
              <img
                src={
                  selectedImage ||
                  "https://via.placeholder.com/400x400?text=No+Image"
                }
                alt={product.name || "Product"}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image")
                }
              />
            </div>

            <div className="flex md:flex-col gap-2 flex-wrap justify-center items-start">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-14 h-14 md:w-16 md:h-16 object-cover cursor-pointer border rounded ${
                    selectedImage === img
                      ? "border-orange-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=No+Image")
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>

          {/* Price */}
          <div className="text-lg sm:text-xl text-gray-600">
            {product.priceDetails?.totalPrice ? (
              <>
                <span className="text-xl font-bold text-black">
                  ₹
                  {parseFloat(product.priceDetails.totalPrice).toLocaleString(
                    "en-IN"
                  )}
                </span>
                {product.priceDetails.pricePerGram && (
                  <span className="text-sm text-orange-500 ml-2">
                    (₹{product.priceDetails.pricePerGram}/g)
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="text-xl font-bold text-black">
                  ₹
                  {parseFloat(
                    product.discountedPrice || product.price || 0
                  ).toLocaleString("en-IN")}
                </span>
                {product.price &&
                  product.discountedPrice &&
                  product.price > product.discountedPrice && (
                    <>
                      <span className="line-through text-gray-400 ml-2">
                        ₹{parseFloat(product.price).toLocaleString("en-IN")}
                      </span>
                      <span className="text-orange-500 font-semibold ml-2">
                        (
                        {(
                          ((product.price - product.discountedPrice) /
                            product.price) *
                          100
                        ).toFixed(0)}
                        % OFF)
                      </span>
                    </>
                  )}
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700">
            {product.description || "No description available."}
          </p>

          {/* Specifications */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {product.netWeight ? `${product.netWeight}g` : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Karat:</span>{" "}
                {product.carat || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Metal:</span>{" "}
                {product.metal || "Gold"}
              </p>
              <p>
                <span className="font-semibold">Availability:</span>{" "}
                <span
                  className={
                    product.isAvailable !== false
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.isAvailable !== false ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              {product.dimensions && (
                <p>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {product.dimensions}
                </p>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex justify-center items-center"
              disabled={product.isAvailable === false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description Text */}
      <div className="border-t-2 border-gray-200 w-full mt-8">
        <div className="px-2 sm:px-4 md:px-8 py-6">
          <h2 className="text-xl sm:text-2xl mb-4">Description</h2>
          <p className="text-base sm:text-lg text-gray-700 whitespace-pre-line">
            {shopDetails?.description ||
              "Celebrate elegance with SriLaxmi Alankar's exclusive gold jewelry."}
          </p>
        </div>

        <div className="overflow-x-auto px-2 sm:px-4 md:px-8 pb-8">
          <table className="border-2 border-gray-200 w-full md:w-4/5 mx-auto my-4">
            <tbody>
              {dynamicDescriptionData.map((item, index) => (
                <tr key={index} className="border-2">
                  <td className="border-2 bg-gray-200 w-1/3 py-2 px-3 text-sm sm:text-base">
                    {item.name}
                  </td>
                  <td className="border-2 w-2/3 px-3 py-2 text-sm sm:text-base">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t-2 border-gray-200 w-full py-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-12 md:w-16 h-px bg-gray-300"></div>
          <img
            src="/Category/icon.png"
            alt="Diamond Icon"
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <div className="w-12 md:w-16 h-px bg-gray-300"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-garamond bg-gradient-to-r from-[#E66E06] to-[#6E3000] text-transparent bg-clip-text text-center mb-6">
          Related Products
        </h2>

        {loadingRelated ? (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <span className="ml-2 text-gray-600">
              Loading related products...
            </span>
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-4 md:px-8">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleRelatedProductClick(relatedProduct)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedProduct.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(relatedProduct.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M9 6V4a1 1 0 00-1-1H4a1 1 0 00-1 1v2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              No related products available
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for more items
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ProductDetailComplete;
