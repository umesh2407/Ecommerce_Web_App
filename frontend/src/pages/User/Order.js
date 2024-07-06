import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container mx-auto my-3 px-3 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <UserMenu />
          </div>
          <div className="col-span-3">
            <h1 className="text-3xl font-bold text-center mb-4">All Orders</h1>
            {orders.map((o, i) => (
              <div key={o._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4">Order #</th>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Buyer</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Payment Status</th>
                      <th className="py-2 px-4">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4">{i + 1}</td>
                      <td className="py-2 px-4">{o?.status}</td>
                      <td className="py-2 px-4">{o?.buyer?.name}</td>
                      <td className="py-2 px-4">{moment(o?.createdAt).fromNow()}</td>
                      <td className="py-2 px-4">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="py-2 px-4">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {o?.products?.map((p) => (
                    <div key={p._id} className="bg-gray-100 rounded-lg p-4 flex flex-row items-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm">{p.description.substring(0, 30)}</p>
                        <p className="font-bold">Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
