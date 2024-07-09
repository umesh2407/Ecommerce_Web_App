import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Review from "./Review";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        productId: product._id,
        comment,
        rating,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/product/review`,
        reviewData
      );
      if (response.data.success) {
        toast.success("Review submitted successfully");
        setComment("");
        setRating(0);
        getProduct();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center md:justify-center">
          <div className="md:max-w-md rounded-lg overflow-hidden shadow-md mb-8 md:mb-0">
            <img
              src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-auto md:h-96 object-cover"
            />
            <div className="p-4">
              <h1 className="text-3xl font-thin text-center mb-4">
                Product Details
              </h1>
              <hr className="border-gray-300 mb-4" />
              <div className="text-left">
                <div className="mb-2">
                  <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div className="mb-2">
                  <h6 className="text-base font-semibold">Description:</h6>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <div className="mb-2">
                  <h6 className="text-base font-semibold">Price:</h6>
                  <p className="text-lg font-medium text-green-600">
                    {product?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
                <div className="mb-2">
                  <h6 className="text-base font-semibold">Category:</h6>
                  <p className="text-sm text-gray-600">
                    {product?.category?.name}
                  </p>
                </div>
                <button
                  className="btn btn-dark flex items-center justify-center w-full py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-900"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  <FaShoppingCart className="text-xl" />
                  <span className="ml-2">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reviews ({product.numOfReviews})
          </h2>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <Review
                key={review._id}
                rating={review.rating}
                comment={review.comment}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No reviews yet...</p>
          )}

          {/* Review Form */}
          <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-dark text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="flex flex-col w-full md:w-auto text-center mt-10">
          <h4 className="text-2xl mb-4 font-semibold font-sans">
            Similar Products
          </h4>
          {relatedProducts.length === 0 && (
            <p className="text-gray-500">No Similar Products found</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((p) => (
              <div key={p._id} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold mb-2">{p.name}</h5>
                  <p className="text-sm mb-2">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                    <button
                      className="btn btn-info text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
