  import React, { useState } from 'react';
  import logo from "../../images/logo.png";
  import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  import { IoLogOutOutline } from "react-icons/io5";

  const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <header className="bg-white shadow-md flex justify-between items-center py-4 px-4 md:px-8 ">
        <div className="flex items-center">
          <Link to="/">
          <img src={logo} alt="Logo" className="w-[150px]" /></Link>
        </div>
        <nav className={`flex ${isMobileMenuOpen ? 'flex-col absolute top-16 left-0 w-full bg-white' : 'hidden md:flex'}`}>
          <ul className="md:flex gap-10">
            <li className="text-gray-800 hover:text-black text-lg"><Link to="/"> Home</Link></li>
            <li className="text-gray-800 hover:text-black text-lg"><Link to="/products"> Products</Link></li>
            <li className="text-gray-800 hover:text-black text-lg"><Link to="/about"> About</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-6">
        <Link to="/search"  className="text-gray-800 hover:text-black text-xl"> <FaSearch /></Link>
          <Link to="/cart" className="text-gray-800 hover:text-black text-xl"><FaShoppingCart /></Link>
          <Link to="/login" className="text-gray-800 hover:text-black text-xl"><FaUser /></Link>
          <Link to="/logout" className="text-gray-800 hover:text-black text-xl"><IoLogOutOutline/></Link>
        </div>
        <div className="header__menu-icon md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes className="text-gray-800 text-3xl" /> : <FaBars className="text-gray-800 text-3xl" />}
        </div>
      </header>
    );
  };

  export default Header;
  