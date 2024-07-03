import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 flex flex-wrap items-center">
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <h4 className="text-lg font-medium mb-2">DOWNLOAD OUR APP</h4>
        <p className="text-sm text-center">Download App for Android and IOS mobile phone</p>
        <div className="flex mt-2">
          <img src={playStore} alt="playstore" className="w-20 mr-4 cursor-pointer" />
          <img src={appStore} alt="Appstore" className="w-20 cursor-pointer" />
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        {/* <h1 className="text-4xl font-bold mb-2">ECOMMERCE.</h1> */}
        <Link to="/">
        <img src={logo} alt="Logo" className="w-[300px]" /></Link>
      
        <p className="text-lg text-center">High Quality is our first priority</p>
        <p className="text-sm mt-4">&copy; 2024 Umesh Choudhary</p>
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-4 md:mt-0">
        <h4 className="text-lg font-medium mb-2">Follow Us</h4>
        <div className="flex">
          <a href="https://www.linkedin.com/in/umesh-choudhary-67980a242/" className="text-lg mr-4 hover:text-black transition duration-500">Instagram</a>
          <a href="https://www.linkedin.com/in/umesh-choudhary-67980a242/" className="text-lg mr-4 hover:text-black transition duration-500">Youtube</a>
          <a href="https://www.linkedin.com/in/umesh-choudhary-67980a242/" className="text-lg hover:text-black transition duration-500">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
