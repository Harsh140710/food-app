import React, { useState } from "react";
import "../../index.css"; // Ensure your theme and TailwindCSS styles are loaded
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";

const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", video);
      formData.append("foodPartner", foodPartner)

      const response = await axios.post(
        "http://localhost:3000/api/food/",
        formData,
        { withCredentials: true }
      );

      toast.success("Food added successfully!");
      navigate("/food-partner/:id");
    } catch (error) {
      const message = error?.response?.data || "Failed to add food!";
      toast.error(message);
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Add New Food</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Food Name */}
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="poppins-medium"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Food Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="poppins-medium"
          />

          {/* Video Upload */}
          <div className="flex flex-col">
            <label className="text-[#111111] font-semibold mb-5 poppins-medium">
              Upload Video
            </label>
            <div
              className={`relative border-2 border-dashed rounded-2xl cursor-pointer flex flex-col items-center justify-center bg-white hover:shadow-xl transition-all ${
                video ? "border-[#ff6b01]" : "border-[#ff5500]"
              }`}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer poppins-medium"
              />
              <File className="h-12 w-12 text-[#ff6b01]"/>
              <span className="text-[#666] text-sm text-center poppins-medium">
                {video
                  ? video.name
                  : "Drag & drop your video here, or click to select"}
              </span>
              {video && (
                <span className="absolute top-2 right-4 text-xs text-gray-500 poppins-medium">
                  Selected
                </span>
              )}
            </div>

            {/* Preview */}
            <div className="h-full w-full flex items-center justify-center video">
              {preview && (
              <video
                src={preview}
                autoPlay
                className="rounded-xl shadow-lg h-[200px] w-[200px] object-cover"
              />
            )}
            </div>
          </div>

          <button type="submit" className="auth-btn poppins-medium">
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
