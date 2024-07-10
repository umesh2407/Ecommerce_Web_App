import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <h4 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/admin/create-category"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
         Update Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
