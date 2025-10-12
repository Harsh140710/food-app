import React, { useEffect, useRef } from "react";

const videos = [
  {
    id: 1,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Discover our exclusive fashion collection — bold styles, top trends!",
  },
  {
    id: 2,
    src: "https://www.w3schools.com/html/movie.mp4",
    description: "Step into comfort and style with the latest sneakers drop.",
  },
  {
    id: 3,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Upgrade your tech life — new gadgets, great prices!",
  },
];

const Home = () => {
  const videoRefs = useRef([]);

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

      {videos.map((video, index) => (
        <div
          key={video.id}
          className="relative h-screen w-full snap-start flex justify-center items-center"
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.src}
            className="h-full w-full object-cover"
            loop
            muted
          />

          {/* Overlay text and button */}
          <div className="absolute bottom-20 left-6 right-20 flex flex-col items-start max-w-[70%] space-y-10">
            {/* Description */}
            <p
              id="description"
              className="text-white text-2xl sm:text-2xl font-semibold leading-snug mb-2 poppins-bold"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {video.description}
            </p>

            {/* Button */}
            <button
              id="visitStore"
              className="bg-orange-500 text-white text-2xl rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all scale-90 poppins-bold"
            >
              Visit Store
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
