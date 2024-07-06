import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container mx-auto my-3 p-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <AdminMenu />
          </div>
          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Admin Name: {auth?.user?.name}</h3>
              <h3 className="text-xl font-semibold mb-2">Admin Email: {auth?.user?.email}</h3>
              <h3 className="text-xl font-semibold">Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
