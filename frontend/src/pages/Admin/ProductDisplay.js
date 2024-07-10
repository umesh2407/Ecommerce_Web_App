import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalproduct, setTotalproduct] = useState(0);
  const itemsPerPage = 6;

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/get-product`);
      setProducts(data.products);
      setTotalproduct(data.counTotal);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / itemsPerPage)));
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row mt-10">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <AdminMenu />
          </div>
          <div className="md:w-3/4">
            <h1 className="text-2xl font-thin text-center mb-4">All Products List</h1>
            <h5 className="text-2xl font-semibold text-center mb-4">Total Products = {totalproduct}</h5>
           
            <div className="flex flex-wrap">
              {currentItems.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="w-full md:w-1/2 lg:w-1/3 p-2"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name}
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-bold mb-2">{p.name}</h5>
                      {/* <p className="text-gray-700">{p.description}</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDisplay;
