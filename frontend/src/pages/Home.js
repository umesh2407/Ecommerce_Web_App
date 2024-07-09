import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { Prices } from "../components/Prices";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth(); // Assume useAuth provides authentication context

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add product to wishlist
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
    <Layout title={"All Products - Best offers "}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 mt-5">
        <div className="col-span-1 shadow-2xl rounded-2xl mb-10">
          <h4 className="text-center text-xl font-semibold mt-5 shadow-sm">
            Filter By Category
          </h4>
          <div className="flex flex-col mt-5 ml-8">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="mb-2 text-xl font-semibold"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center text-xl font-semibold mt-6 shadow-sm">
            Filter By Price
          </h4>
          <div className="flex flex-col mt-5 ml-8 ">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} className="mb-2 text-2xl font-semibold">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col mt-4">
            <button
              className="mt-8 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-span-3 mb-10">
          <h1 className="text-center text-2xl font-bold mb-6">All Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((p) => (
              <div
                className="card bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative"
                key={p._id}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                  className="w-full h-96 object-cover"
                  alt={p.name}
                />
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => addToWishlist(p._id) }
                >
                  <FaRegHeart className="text-2xl" />
                </button>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-semibold">{p.name}</h5>
                    <h5 className="text-lg font-semibold text-green-600">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      className="btn btn-info text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                      onClick={() => navigate(`/product/${p.slug}`)}
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
          <div className="mt-6 flex justify-center">
            {products && products.length < total && (
              <button
                className="btn loadmore text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
