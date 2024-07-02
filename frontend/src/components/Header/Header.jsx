// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../images/logo.png";

// const options = {
//   burgerColorHover: "#2effe7",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#2effe7",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#2effe7",
//   link1Margin: "1vmax",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   profileIconColorHover: "#2effe7",
//   searchIconColorHover: "#2effe7",
//   cartIconColorHover: "#2effe7",
//   cartIconMargin: "1vmax",

// //   searchIcon:	"true",
// //   SearchIconElement:	"required",
// //   cartIcon:	"true",
// // CartIconElement,
// // profileIcon:"true",
// // ProfileIconElement,
// // searchIconUrl:"/search",
// // cartIconUrl:"/cart",
// // profileIconUrl:"/account"
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;
import React, { useState } from 'react';
import logo from "../../images/logo.png";
import './Header.css';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--mobile' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      <div className="header__icons">
        <a href="/search"><FaSearch /></a>
        <a href="/cart"><FaShoppingCart /></a>
        <a href="/account"><FaUser /></a>
      </div>
      <div className="header__menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
