import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) newErrors.email = "Please enter email";
    if (!password) newErrors.password = "Please enter password";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        {
          email,
          password,
        }
      );
      if (response && response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
        setErrors({ general: response.data.message });
      }
    } catch (error) {
      setErrors({ general: error.response.data.message });
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex h-screen items-center overflow-hidden px-2 mb-10">
        <div className="relative flex w-full flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl max-w-md mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <img src="/logo-2.png" alt="E-Shop Logo" className="w-[60px] ml-5" />
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Sign in
            </h1>
            {errors.general && <p className="text-red-500">{errors.general}</p>}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border-1 peer block w-full appearance-none rounded-lg border px-2.5 pt-4 pb-2.5 text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-transparent text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                placeholder={errors.email || " "}
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                Enter Your Email
              </label>
            </div>

            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`border-1 peer block w-full appearance-none rounded-lg border px-2.5 pt-4 pb-2.5 text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-transparent text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                placeholder={errors.password || " "}
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                Enter Your Password
              </label>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-800 text-white py-3 rounded-lg font-bold mt-2"
              >
                Login
              </button>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot your password?
              </Link>
              <p className="text-gray-600">
                Don't have an account?
                <Link
                  to="/register"
                  className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
