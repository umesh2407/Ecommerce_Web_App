import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header/Header';
import Webfont from 'webfontloader';
import Footer from './components/Footer/Footer';


const App = () => {
  
React.useEffect(()=>{
  Webfont.load({
    google: {
      families: ["Roboto","Droid Sans", "Chilanka"]
    }
  })
});

  return (
    <Router>
 <>
 <Header/>
<Footer/>
 </>
    </Router>
  )
}

export default App