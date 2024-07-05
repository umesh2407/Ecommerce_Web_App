import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center dashboard-menu">
      <div className="list-group">
        <h4 className="text-lg font-bold mb-4">Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="block py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-100"
          activeClassName="bg-gray-100"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="block py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-100"
          activeClassName="bg-gray-100"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
