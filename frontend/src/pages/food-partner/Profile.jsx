import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          { withCredentials: true }
        );
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-10 px-4">
      {/* Profile Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-gray-200">
          {/* Left: Profile Info */}
          <div className="flex items-center gap-5">
            <img
              src="https://images.unsplash.com/photo-1742201906101-428bb48b9866?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.businessName}
              </h1>
              <p className="text-gray-600">{profile.address}</p>
            </div>
          </div>

          {/* Right: Stats + Add Food */}
          <div className="flex flex-col md:items-end mt-6 md:mt-0 gap-3">
            {/* Stats Row */}
            <div className="flex gap-10 text-center">
              <div>
                <p className="text-sm text-gray-500">Total Meals</p>
                <p className="text-xl font-semibold text-orange-600">
                  {profile.totalMeals || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customers Served</p>
                <p className="text-xl font-semibold text-orange-600">
                  {profile.totalCustomer || 0}
                </p>
              </div>
            </div>

            {/* Add Food Button */}
            <button
              onClick={() => navigate("/create-food")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm transition-all"
            >
              + Add Food
            </button>
          </div>
        </div>

        {/* Videos Section */}
        {/* Videos Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-orange-500 pl-3 text-gray-800">
            Uploaded Videos
          </h2>

          {videos.length === 0 ? (
            <div className="text-gray-500 text-center py-10">
              No videos uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((videoItem, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden group border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <video
                    src={videoItem.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-40 sm:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs p-2 truncate">
                    {videoItem.description || "No description"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
