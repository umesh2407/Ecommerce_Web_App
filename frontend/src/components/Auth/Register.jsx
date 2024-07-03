import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        name,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        requestData
      );
      const token = response.data.token;
      console.log("Registration successful", response.data);
      localStorage.setItem("token", token);
      alert("User registered successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-gray-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign Up
          </h1>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Enter Your Name
            </label>
          </div>

          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
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
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Enter Your Password
            </label>
          </div>

          <div className="flex w-full items-center mt-4">
            <button
              type="submit"
              className="inline-block w-36 rounded-lg bg-gray-600 py-3 font-bold text-white hover:bg-gray-700 transition duration-300"
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
  );
};

export default Register;
