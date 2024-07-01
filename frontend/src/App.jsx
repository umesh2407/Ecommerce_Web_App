import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Webfont from "webfontloader";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

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
      <Header />
      <Home />
      <Footer />
    </Router>
  );
};

export default App;
