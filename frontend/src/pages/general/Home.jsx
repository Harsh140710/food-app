import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav.jsx";
import VideoPlayer from "../../components/VideoPlayer.jsx";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => setVideos(response.data.foodItems))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(error => console.log("Video autoplay was prevented:", error));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 } // Video needs to be 80% in view to play
    );

    const currentRefs = videoRefs.current;
    currentRefs.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentRefs.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]); // Rerun observer logic when videos are loaded

  return (
    <div className="h-screen w-full bg-black">
      <div
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
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
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;