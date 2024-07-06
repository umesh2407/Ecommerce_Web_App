import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 mb-10 ">
            {values?.results.map((p) => (
              <div key={p._id} className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                  className="w-full h-64 object-cover"
                  alt={p.name}
                />
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
                      className="btn text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
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
