import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsChatDots } from "react-icons/bs";

const VideoPlayer = React.forwardRef(({ item }, ref) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sample count state (you can later fetch from backend)
  const [likeCount, setLikeCount] = useState(item.likes || 125);
  const [saveCount, setSaveCount] = useState(item.saves || 52);
  const [commentCount, setCommentCount] = useState(item.comments || 14);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount((prev) => (isSaved ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative h-screen w-full snap-start flex justify-center items-center bg-black">
      <video
        ref={ref}
        src={item.video}
        className="h-full w-full object-cover"
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        onClick={(e) =>
          e.target.paused ? e.target.play() : e.target.pause()
        }
      />

      <div className="absolute top-0 left-0 h-full w-full p-4 pb-24 flex flex-col justify-end z-10">
        <div className="flex justify-between items-end">
          {/* Left side: Description + Store Button */}
          <div className="flex flex-col items-start max-w-[70%] space-y-4">
            <p className="text-white text-lg font-medium leading-tight line-clamp-2 overflow-hidden text-ellipsis break-words max-w-[100%] tracking-wide">
              {item.description}
            </p>
            <Link
              to={`/food-partner/${item.foodPartner}`}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-colors text-xl tracking-wider"
            >
              Visit store
            </Link>
          </div>

          {/* Right side: Actions + Counts */}
          <div className="flex flex-col items-center gap-y-8 mb-10">
            <div
              onClick={handleLike}
              className="cursor-pointer flex flex-col items-center"
            >
              {isLiked ? (
                <AiFillHeart size={45} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={45} className="text-white" />
              )}
              <span className="text-white text-sm mt-1">{likeCount}</span>
            </div>

            <div
              onClick={handleSave}
              className="cursor-pointer flex flex-col items-center"
            >
              {isSaved ? (
                <BsBookmarkFill size={38} className="text-white" />
              ) : (
                <BsBookmark size={38} className="text-white" />
              )}
              <span className="text-white text-sm mt-1">{saveCount}</span>
            </div>

            <div className="cursor-pointer flex flex-col items-center">
              <BsChatDots size={38} className="text-white" />
              <span className="text-white text-sm mt-1">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
