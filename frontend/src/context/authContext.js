import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setAuth({
          user: parsedData.user,
          token: parsedData.token,
        });
      } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        localStorage.removeItem("auth"); // Remove corrupted data
      }
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
