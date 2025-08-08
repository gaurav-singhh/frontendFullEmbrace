import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ slug, title, featuredImage }) {
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  return (
    <Link to={`/post/${slug}`}>
      <div
        className={`w-full ${
          isDarkTheme ? "bg-gray-800 text-stone-200" : "bg-gray-200 text-black"
        } rounded-xl p-4 transition-transform transform hover:scale-105 hover:shadow-3d`}
      >
        <div className="w-full flex justify-center mb-4">
          <img src={featuredImage} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
