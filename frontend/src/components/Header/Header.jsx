import React, { useState } from 'react';
import logo from "../../images/logo.png";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md flex justify-between items-center py-2 px-4 md:px-8">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-[130px]" />
      </div>
      <nav className={`flex ${isMobileMenuOpen ? 'flex-col absolute top-16 left-0 w-full bg-white' : 'hidden md:flex'}`}>
        <ul className="md:flex gap-4">
          <li><a href="/" className="text-gray-800 hover:text-black text-lg">Home</a></li>
          <li><a href="/products" className="text-gray-800 hover:text-black text-lg">Products</a></li>
          <li><a href="/contact" className="text-gray-800 hover:text-black text-lg">Contact</a></li>
          <li><a href="/about" className="text-gray-800 hover:text-black text-lg">About</a></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <a href="/search" className="text-gray-800 hover:text-black text-2xl"><FaSearch /></a>
        <a href="/cart" className="text-gray-800 hover:text-black text-2xl"><FaShoppingCart /></a>
        <a href="/login" className="text-gray-800 hover:text-black text-2xl"><FaUser /></a>
      </div>
      <div className="header__menu-icon md:hidden" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes className="text-gray-800 text-3xl" /> : <FaBars className="text-gray-800 text-3xl" />}
      </div>
    </header>
  );
};

export default Header;
