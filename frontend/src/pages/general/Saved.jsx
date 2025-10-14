import React from "react";
import BottomNav from "../../components/BottomNav.jsx";

const Saved = () => {
  // In the future, you would fetch saved videos from your API here
  return (
    // Gray background for the entire page
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-900">

      {/* Phone-like container */}
      <div className="relative w-full h-screen bg-black flex flex-col items-center text-white">
        <h1 className="text-2xl font-bold mt-20">Saved Videos</h1>
        <p className="mt-4 text-gray-400">Your saved videos will appear here.</p>
        
        <BottomNav />
      </div>

    </div>
  );
};

export default Saved;