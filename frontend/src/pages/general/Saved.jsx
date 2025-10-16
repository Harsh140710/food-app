import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/BottomNav.jsx";
import VideoPlayer from "../../components/VideoPlayer.jsx";
import { toast } from "sonner";

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/saved", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount || 0,
          saveCount: item.food.saveCount || 0,
          commentCount: item.food.commentCount || 0,
          foodPartner: item.food.foodPartner || "",
        }));

        setSavedVideos(savedFoods);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center text-white overflow-hidden">
      {/* Video Feed */}
      <h2 className="left-0 w-full text-2xl mt-5 ml-10 z-99 absolute">Saved</h2>
      {loading ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
          Loading your saved videos...
        </p>
      ) : savedVideos.length === 0 ? (
        <p className="absolute flex items-center justify-center h-screen w-full text-gray-400">
          You haven't saved any videos yet.
        </p>
      ) : (
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {savedVideos.map((video, index) => (
            <div key={index} className="h-screen w-full snap-start">
              <VideoPlayer item={video} />
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full">
        <BottomNav />
      </div>
    </div>
  );
};

export default Saved;
