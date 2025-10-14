import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Profile.css"; // Keep this import!

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
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        {/* --- Header --- */}
        <header className="profile-header">
          <div className="header-main">
            <img
              src="https://images.unsplash.com/photo-1742201906101-428bb48b9866?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500"
              alt=""
              className="profile-picture"
            />
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

        {/* --- Videos Grid --- */}
        <main className="video-grid">
          {videos.map((videoItem, index) => (
            <div key={index} className="video-placeholder">
              <video
                src={videoItem.video}
                muted
                autoPlay
                loop
                playsInline
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Profile;
