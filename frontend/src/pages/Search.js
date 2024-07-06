import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <h6 className="mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {values?.results.map((p) => (
              <div key={p._id} className="card bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{p.name}</h5>
                  <p className="text-gray-600 mb-2">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-gray-800 font-semibold">
                  ₹ {p.price}
                  </p>
                  <div className="mt-4">
                    <button   onClick={() => navigate(`/product/${p.slug}`)}  className="btn btn-dark text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">More Details</button>
                    <button    className="btn btn-dark text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded">ADD TO CART</button>
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
