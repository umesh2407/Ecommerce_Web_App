import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(3); // Number of orders per page

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success("Order Status updated")
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination handlers
  const indexOfLastOrder = currentPage * perPage;
  const indexOfFirstOrder = indexOfLastOrder - perPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the starting index for the current page
  const startIndex = (currentPage - 1) * perPage;

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-col lg:flex-row mt-10">
        <div className="w-full lg:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full lg:w-3/4">
          <h1 className="text-center text-2xl font-bold mb-4">All Orders</h1>
          {currentOrders.map((o, index) => {
            // Calculate the order number based on the starting index and current index
            const orderNumber = startIndex + index + 1;

            return (
              <div key={o._id} className="border shadow mb-4 p-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {/* Render table header for each batch of orders */}
                    {startIndex === 0 && index === 0 && (
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">no.</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{orderNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          className="w-full"
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.buyer?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{moment(o?.createdAt).fromNow()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mt-4">
                  {o?.products?.map((p) => (
                    <div className="flex mb-2 p-3 border rounded-lg items-center ml-10" key={p._id}>
                      <div className="w-1/4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                          className="object-cover w-[100px] h-[100px] rounded-lg "
                          alt={p.name}
                        />
                      </div>
                      <div className="w-3/4 pl-4">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.description.substring(0, 30)}</p>
                        <p className="font-medium">Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {/* Pagination buttons */}
          <div className="flex justify-center mt-4 space-x-3 mb-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastOrder >= orders.length}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
