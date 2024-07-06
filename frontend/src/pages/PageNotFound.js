import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">
          Oops! Page Not Found
        </h2>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
