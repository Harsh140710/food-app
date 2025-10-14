import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkFill, BsFillChatDotsFill } from "react-icons/bs";

const VideoPlayer = React.forwardRef(({ item }, ref) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || 23);
  const [saveCount, setSaveCount] = useState(item.saves || 23);
  const [commentCount, setCommentCount] = useState(item.comments || 45);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setSaveCount(isSaved ? saveCount - 1 : saveCount + 1);
  };

  return (
    <div className="relative h-screen w-full snap-start flex justify-center items-center">
      {/* Video */}
      <video
        ref={ref}
        src={item.video}
        className="h-full w-full object-cover"
        loop
        muted
        preload="metadata"
        playsInline
      />

      {/* Header */}
      <h1 className="absolute top-5 left-5 text-white text-2xl font-bold z-10">Video</h1>

      {/* --- CORRECTED SECTION STARTS HERE --- */}
      {/* Side Action Bar */}
      <div className="absolute bottom-28 right-2 flex flex-col items-center gap-y-5 z-10 text-white">
        
        {/* Like Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={handleLike}>
          <AiFillHeart size={45} className={`${isLiked ? 'text-red-500' : 'text-white'}`} />
          <span className="text-sm font-semibold">{likeCount}</span>
        </div>
        
        {/* Save Button */}
        <div className="flex flex-col items-center cursor-pointer" onClick={handleSave}>
          <BsBookmarkFill size={40} className={`${isSaved ? 'text-yellow-400' : 'text-white'}`} />
          <span className="text-sm font-semibold">{saveCount}</span>
        </div>
        
        {/* Comment Button */}
        <div className="flex flex-col items-center cursor-pointer">
          <BsFillChatDotsFill size={40} />
          <span className="text-sm font-semibold">{commentCount}</span>
        </div>

      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-24 left-4 right-20 flex flex-col items-start max-w-[70%] space-y-4 z-10">
        {/* Description */}
        <p
          id="description"
          className="text-white text-lg font-medium"
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
          className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-3xl font-bold shadow-lg transition-colors"
        >
          Visit store
        </Link>
      </div>
    </div>
  );
});

export default VideoPlayer;