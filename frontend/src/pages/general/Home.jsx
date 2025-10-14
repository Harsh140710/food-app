import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/BottomNav.jsx";
import VideoPlayer from "../../components/VideoPlayer.jsx";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());

  useEffect(async () => {
    try {
      const response =  await axios
        .get("http://localhost:3000/api/food", { withCredentials: true });

        console.log(response.data.foodItems);
        setVideos(response.data.foodItems)
        
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
      
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    const currentRefs = videoRefs.current;
    currentRefs.forEach((video) => video && observer.observe(video));

    return () => currentRefs.forEach((video) => video && observer.unobserve(video));
  }, [videos]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-900">
      <div
        className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {videos.map((item) => (
          <VideoPlayer
            key={item._id}
            item={item}
            ref={(el) => videoRefs.current.set(item._id, el)}
          />
        ))}

        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
