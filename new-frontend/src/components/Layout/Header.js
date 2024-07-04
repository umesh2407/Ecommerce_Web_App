import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="E-Shop Logo" className="w-[150px]" />
            </Link>
          </div>

          {/* Primary Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900 hover:underline">
              Home
            </Link>
            <Link to="/category" className="py-5 px-3 text-gray-700 hover:text-gray-900 hover:underline">
              Category
            </Link>
            <Link to="/cart" className="py-5 px-3 text-gray-700 hover:text-gray-900 hover:underline">
              Cart(0)
            </Link>
          </div>

          {/* User Icon */}
          <div className="hidden md:flex items-center">
            <Link to="/login" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              <FaRegUserCircle className="h-7 w-6" />
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleMenu}>
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
      <div className={`mobile-menu ${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Home
        </Link>
        <Link to="/category" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Category
        </Link>
        <Link to="/cart" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Cart(0)
        </Link>
        <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">
          <FaRegUserCircle />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
