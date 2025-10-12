import React from "react";
import "../../Profile.css"; // Import the stylesheet
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* Top Header Section */}
        <header className="profile-header">
          <div className="header-main">
            <img src="https://images.unsplash.com/photo-1742201906101-428bb48b9866?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500" alt="" className="profile-picture"/>
            <div className="business-details">
              <div className="business-name">{profile?.businessName}</div>
              <div className="business-address">{profile?.address}</div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">total meals</span>
              <span className="stat-value">{profile?.totalMeals}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">customers served</span>
              <span className="stat-value">{profile?.totalCustomer}</span>
            </div>
          </div>
        </header>

        {/* Video Grid Section */}
        <main className="video-grid">
          {videos.map((videoItem, index) => (
            <div key={index} className="video-placeholder">
              <video
                src={videoItem.video}
                muted
                autoPlay
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Profile;
