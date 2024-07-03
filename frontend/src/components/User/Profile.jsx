import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css"; // Import your external CSS file

const Profile = () => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user._id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <main className="profile-main">
        <div className="profile-card">
          <h1 className="profile-title">My Profile</h1>
          {/* Assuming user.avatar?.url is used for avatar display */}
          <img src={user.avatar?.url} alt={user.name} className="profile-avatar" />
          <Link to="/me/update" className="profile-edit-link">
            Edit Profile
          </Link>
        </div>
        <div className="profile-details">
          <div className="profile-info">
            <h4 className="profile-info-title">Full Name</h4>
            <p className="profile-info-text">{user.name}</p>
          </div>
          <div className="profile-info">
            <h4 className="profile-info-title">Email</h4>
            <p className="profile-info-text">{user.email}</p>
          </div>
          <div className="profile-info">
            <h4 className="profile-info-title">Joined On</h4>
            <p className="profile-info-text">{String(user.createdAt).substr(0, 10)}</p>
          </div>
          <div className="profile-actions">
            <Link to="/orders" className="profile-action-link">My Orders</Link>
            <Link to="/password/update" className="profile-action-link">Change Password</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
