"use client";
import { useState } from "react";

export default function LikeButton({
  initialLiked ,
  onToggle = () => {},
}) {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    console.log("Liked:", newLiked);
    onToggle(newLiked); // 👈 esta línea debe ejecutarse
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
        ${liked ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}
        hover:bg-blue-200 hover:text-blue-700`}
    >
      {liked ? "👍 Me gusta" : "👍 Dar like"}
    </button>
  );
}
