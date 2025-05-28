import Link from "next/link";
import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import LikeButton from "./LikeButton";
import { useState } from "react";
export default function Card({ title, user, id, numLikes, numComments }) {
  const [likes, setLikes] = useState(numLikes);

  const handleLikeToggle = (liked) => {
    console.log(likes);
    setLikes((prev) => prev + (liked ? 1 : -1));
    console.log(likes);
  };

  return (
    <div
      key={id}
      className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-6"
    >
      <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">{title}</h5>
      <p className="text-base font-light leading-relaxed text-inherit mb-4">
        Autor: {user}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <Link href={`/Posts/${id}`}>
          <button
            className="mt-auto text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg transition"
            type="button"
          >
            Read More
          </button>
        </Link>
        <div className="flex items-center gap-4 ml-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LikeButton onToggle={handleLikeToggle} initialLiked={false}/>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-green-500" />
            <span>{numComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
