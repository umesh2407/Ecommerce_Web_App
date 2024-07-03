import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiDesktopMouse1 } from "react-icons/ci";

import "./Home.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/product/getall",
          {
            params: {
              limit: 8, // Maximum 8 products
            },
          }
        );
        setFeaturedProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Header />
    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>Find Amazing Products below </h1>
      <a href="#featured-products">
        <button className="mt-8 px-6 py-3 bg-white text-black border border-white rounded-lg shadow-lg transition duration-300 hover:bg-transparent hover:text-white">
          Scroll <CiDesktopMouse1 className="inline-block ml-2" />
        </button>
      </a>
    </div>
    <h2 className="text-3xl font-semibold mb-6 text-center mt-5">Featured Products</h2>
    <div id="featured-products" className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {featuredProducts.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="hover:no-underline"
        >
          <div className="border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={
                  product.images.length > 0
                    ? product.images[0].url
                    : "path/to/placeholder.jpg"
                }
                alt={product.name}
                className="w-full h-full object-cover mb-2 rounded"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-gray-600 ml-2">
                ({product.NumOfReviews} Reviews)
              </span>
            </div>
            <div className="text-red-500 font-semibold">
              ₹{product.price}
            </div>
          </div>
        </Link>
      ))}
    </div>
      <Footer />
    </>
  );
};

export default Home;
