import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.8 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food",{withCredentials: true})
      .then((response) => setVideos(response.data.foodItems))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  return (
    <div
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>

      {videos.map((item) => (
        <div
          key={item._id}
          className="relative h-screen w-full snap-start flex justify-center items-center"
        >
          {/* Video */}
          <video
            src={item.video}
            className="h-full w-full object-cover"
            loop
            muted
            preload="metadata"
            playsInline
            autoPlay
          />

          {/* Overlay text and button */}
          <div className="absolute bottom-10 left-6 right-20 flex flex-col items-start max-w-[70%] space-y-10">
            {/* Description */}
            <p
              id="description"
              className="text-white text-lg sm:text-2xl font-semibold leading-snug mb-2 poppins-regular"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </p>

            {/* Button */}
            <Link
              to={"/food-partner/" + item.foodPartner}
              id="visitStore"
              className="bg-orange-500 text-white text-2xl rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all scale-90 poppins-medium"
            >
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
