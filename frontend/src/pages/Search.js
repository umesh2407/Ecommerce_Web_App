import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import axios from "axios";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  const navigate = useNavigate();
  const addToWishlist = async (productId) => {
    try {
      if (!auth.token) {
        // Redirect to login if user is not authenticated
        navigate("/login");
        return;
      }

      // API call to add product to wishlist
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/wishlist/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success("Added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-5">Search Results</h1>
          <h6 className="mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mb-10 ">
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                  className="w-full h-64 object-cover"
                  alt={p.name}
                />
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => addToWishlist(p._id)}
                >
                  <FaRegHeart className="text-2xl" />
                </button>
                <div className="p-6">
                  <h5 className="text-xl font-semibold">{p.name}</h5>
                  <p className="text-gray-600 mb-4">
                    {p.description.substring(0, 60)}...
                  </p>
                  <p className="text-gray-800 font-semibold mb-4">
                    ₹ {p.price}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded flex items-center"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add to Cart <FaShoppingCart className="ml-2" />
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

export default Search;
