import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaCaretDown, FaRegHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cart";
import { useWishlist } from "../../context/wishlistContext";
import { Badge } from "antd";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [cart] = useCart();
  const [wishlist] = useWishlist();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="E-Shop Logo" className="w-[150px]" />
            </Link>
          </div>
          <div className="flex-grow hidden md:flex justify-center ml-5">
            <SearchInput />
          </div>
          {/* Primary Nav (Desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              to="/"
              className="py-5 px-3 text-gray-900 hover:text-gray-700 hover:underline font-bold ml-2"
            >
              Home
            </Link>

            <Badge count={cart?.length} showZero>
              <Link
                to="/cart"
                className="py-5 px-3 text-gray-900 hover:text-gray-700 hover:underline font-bold"
              >
                Cart
              </Link>
            </Badge>

            <Link
              to="/wishlist"
              className="py-5 px-3 text-gray-900 hover:text-gray-700 hover:underline font-bold"
            >
              <FaRegHeart />
            </Link>
          </div>

          {/* User Navigation */}
          <div className="flex items-center">
            {!auth.user ? (
              <Link
                to="/login"
                className="hidden md:block py-5 px-3 text-gray-900 hover:text-gray-700"
              >
                <FaRegUserCircle className="h-7 w-6" />
              </Link>
            ) : (
              <div className="hidden md:flex items-center relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="py-5 px-3 text-gray-700 hover:text-gray-900 flex items-center font-bold"
                >
                  {auth?.user?.name}
                  <FaCaretDown className="ml-2" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-8 w-48 bg-white border rounded shadow-lg font-bold">
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === "admin" ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <IoLogOut className="inline mr-2" />
                      LogOut
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Button (Hamburger Menu) */}
            <button
              className="md:hidden ml-2 text-gray-900 hover:text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200"
          >
            Cart ({cart?.length})
          </Link>
          <Link
            to="/wishlist"
            className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200"
          >
            <FaRegHeart className="inline mr-2" />
            Wishlist ({wishlist?.length})
          </Link>
          {!auth.user ? (
            <Link
              to="/login"
              className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200"
            >
              <FaRegUserCircle className="inline mr-2" />
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <IoLogOut className="inline mr-2" />
                LogOut
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
