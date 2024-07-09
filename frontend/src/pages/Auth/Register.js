import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = "Please enter name";
    if (!email) newErrors.email = "Please enter email";
    if (!password) newErrors.password = "Please enter password";
    if (!phone) newErrors.phone = "Please enter phone";
    if (!address) newErrors.address = "Please enter address";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const requestData = {
        name,
        email,
        password,
        phone,
        address,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/signup`,
        requestData
      );
      const token = response.data.token;
      console.log("Registration successful", response.data);
      localStorage.setItem("token", token);
      toast.success("User Registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErrors({ general: error.response.data.message });
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex h-screen items-center overflow-hidden px-2 mb-20 mt-7">
        <div className="relative flex w-full flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl max-w-md mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <img src="/logo-2.png" alt="E-Shop Logo" className="w-[60px] ml-6" />
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Sign Up
            </h1>
            {errors.general && <p className="text-red-500">{errors.general}</p>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border-1 peer block w-full appearance-none rounded-lg border px-2.5 pt-4 pb-2.5 text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } bg-transparent text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                placeholder={errors.name || " "}
              />
              <label
                htmlFor="name"
                className="absolute left-2 top-2 -translate-y-3 text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transform origin-[0] cursor-text select-none bg-white px-2 duration-300"
              >
                Enter Your Name
              </label>
            </div>

            <div className="relative">
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
                className="absolute left-2 top-2 -translate-y-3 text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transform origin-[0] cursor-text select-none bg-white px-2 duration-300"
              >
                Enter Your Email
              </label>
            </div>

            <div className="relative">
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
                className="absolute left-2 top-2 -translate-y-3 text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transform origin-[0] cursor-text select-none bg-white px-2 duration-300"
              >
                Enter Your Password
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`border-1 peer block w-full appearance-none rounded-lg border px-2.5 pt-4 pb-2.5 text-sm ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } bg-transparent text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                placeholder={errors.phone || " "}
              />
              <label
                htmlFor="phone"
                className="absolute left-2 top-2 -translate-y-3 text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transform origin-[0] cursor-text select-none bg-white px-2 duration-300"
              >
                Enter Your Phone
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`border-1 peer block w-full appearance-none rounded-lg border px-2.5 pt-4 pb-2.5 text-sm ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } bg-transparent text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                placeholder={errors.address || " "}
              />
              <label
                htmlFor="address"
                className="absolute left-2 top-2 -translate-y-3 text-sm text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 transform origin-[0] cursor-text select-none bg-white px-2 duration-300"
              >
                Enter Your Address
              </label>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                type="submit"
                className="inline-block w-36 rounded-lg bg-gray-600 py-3 font-bold text-white hover:bg-gray-800 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
