import React, { useState } from "react";
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

      const response = await axios.post("http://localhost:3000/api/food/", formData, {
        withCredentials: true,
      });

      toast.success("Food added successfully!");
      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      const message = error?.response?.data || "Failed to add food!";
      toast.error(message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add New Food
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <textarea
            name="description"
            placeholder="Food Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-3">
              Upload Video
            </label>

            <div
              className={`relative border-2 border-dashed rounded-xl cursor-pointer flex flex-col items-center justify-center bg-white hover:shadow-lg transition-all ${
                video ? "border-orange-400" : "border-orange-500"
              }`}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <File className="h-12 w-12 text-orange-500" />
              <span className="text-gray-500 text-sm text-center px-2 py-3">
                {video
                  ? video.name
                  : "Drag & drop your video here, or click to select"}
              </span>
              {video && (
                <span className="absolute top-2 right-4 text-xs text-gray-400">
                  Selected
                </span>
              )}
            </div>

            {preview && (
              <div className="flex items-center justify-center mt-5">
                <video
                  src={preview}
                  autoPlay
                  muted
                  className="rounded-xl shadow-md h-[200px] w-[200px] object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
