import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Use only the auth state, not the setter

  useEffect(() => {
    const authCheck = async () => {
      try {
        // Set the Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
        
        // Make the request to check authentication
        const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
        console.error("Authentication check failed:", error);
      }
    };
    
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}
