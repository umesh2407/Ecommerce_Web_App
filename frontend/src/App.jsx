import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Webfont from "webfontloader";
import Home from "./components/Home/Home";
import Profile from "./components/User/Profile";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CheckoutPage from "./components/Product/CheckoutPage";

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
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/order-checkout" element={<CheckoutPage/>}/>

    </Routes>
  </Router>
  );
};

export default App;
