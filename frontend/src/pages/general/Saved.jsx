import React from "react";
import BottomNav from "../../components/BottomNav";

const Saved = () => {
  // In the future, you would fetch saved videos from your API here
  return (
    <div className="bg-black text-white h-screen w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-20">Saved Videos</h1>
        <p className="mt-4 text-gray-400">Your saved videos will appear here.</p>
        
        {/* We need the BottomNav on this page too */}
        <BottomNav />
    </div>
  );
};

export default Saved;