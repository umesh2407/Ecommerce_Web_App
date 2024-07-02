import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Webfont from "webfontloader";
import Home from "./components/Home/Home";
import Profile from "./components/User/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CheckoutPage from "./components/Cart/CheckoutPage";
import AddtoCart from "./components/Cart/AddtoCart";
import ReviewCard from "./components/Product/ReviewCard";
import ProductDescription from "./components/Product/ProductDescription";
import ProductsPage from "./components/Product/ProductsPage";
import About from "./components/About/About";

const App = () => {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/order-checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<AddtoCart />} />
        <Route path="/reviews" element={<ReviewCard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product-description" element={<ProductDescription />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
