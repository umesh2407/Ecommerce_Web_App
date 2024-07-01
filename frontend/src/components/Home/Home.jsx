import React from "react";
import { CiDesktopMouse1 } from "react-icons/ci";
import "./Home.css";

const Home = () => {
  return (
    <>
    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>Find Amazing Products below </h1>
      <button>
        Scroll <CiDesktopMouse1 />
      </button>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
        {/* <Product product={product}/> */}
    </div>
    
    </>
  );
};

export default Home;
