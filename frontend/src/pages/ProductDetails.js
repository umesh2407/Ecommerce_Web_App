import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial load for product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Fetch product details
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

  // Fetch related products
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
              <h1 className="text-3xl font-bold text-center mb-4">
                Product Details
              </h1>
              <hr className="mb-4" />
              <div className="text-left">
                <h6 className="mb-2">Name: {product.name}</h6>
                <p className="mb-2">Description: {product.description}</p>
                <p className="mb-2">
                  Price:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
                <p className="mb-2">Category: {product?.category?.name}</p>
                <button
  className="btn btn-dark text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded flex items-center"
  onClick={() => {
    setCart([...cart, product]); // Use `product` instead of `p`
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, product])
    );
    toast.success("Item Added to cart");
  }}
>
  Add to Cart <FaShoppingCart className="ml-2" />
</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-auto text-center mt-10">
          <h4 className="text-2xl mb-4">Similar Products</h4>
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
                      className="btn btn-info text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
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
