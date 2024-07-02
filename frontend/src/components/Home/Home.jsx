import React from "react";
import { CiDesktopMouse1 } from "react-icons/ci";
import Product from './ProductCard';

import "./Home.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const product = {
  name:"blue-shirt",
  images:[{url:"https://assets.ajio.com/medias/sys_master/root/20231027/61fm/653ac185ddf77915195d269a/-473Wx593H-466747617-pink-MODEL.jpg"}],
  price:"$3000",
  _id:"umesh"
}

const Home = () => {
  return (
    <>
    <Header/>
    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>Find Amazing Products below </h1>
      <a href="#container">
      <button>
        Scroll <CiDesktopMouse1 />
      </button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>

    </div>
    <Footer/>
    </>
  );
};

export default Home;
