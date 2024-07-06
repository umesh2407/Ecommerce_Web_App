import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevValue) => --prevValue);
      }, 1000);
      count === 0 &&
        navigate(`/${path}`, {
          state: location.pathname,
        });
      return () => clearInterval(interval);
    }, [count, navigate, location, path]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-gray-500"></div>
      <h1 className="text-center">redirecting to you in {count} second ...</h1>
    </div>
  );
};

export default Spinner;
