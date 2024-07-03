import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/product/getall",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <h2 className="text-3xl font-semibold mb-6 text-center mt-5">
        Products
      </h2>
      <div className="container mx-auto p-4 justify-between">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg mb-4 md:mb-0">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Price</h3>
              <input type="range" className="w-full" />
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-blue-500">Laptop</li>
                <li className="cursor-pointer hover:text-blue-500">Electronics</li>
                <li className="cursor-pointer hover:text-blue-500">Clothes</li>
                <li className="cursor-pointer hover:text-blue-500">Tops</li>
                <li className="cursor-pointer hover:text-blue-500">Attire</li>
                <li className="cursor-pointer hover:text-blue-500">Camera</li>
                <li className="cursor-pointer hover:text-blue-500">SmartPhones</li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Ratings Above</h3>
              <input type="range" className="w-full" />
            </div>
          </div>
          <div className="w-full md:w-3/4 overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
              {products.map((product) => (
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
