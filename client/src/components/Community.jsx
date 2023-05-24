import React from "react";
import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="communityContainer flex flex-col items-center  bg-white  h-3/4 w-full md:w-48 md:h-3/4 px-4 pb-0 m-auto">
      <h1 className="h1 mb-2 font-bold text-3xl text-stone-800">Community</h1>
      <Link
        to="/recipes"
        className="text-lg text-stone-700 cursor-pointer hover:scale-125 transition hover:text-green-600 hover:overline"
      >
        <h2>Recipes</h2>
      </Link>
      <Link
        to="/lifestyle"
        className="text-lg text-stone-700 cursor-pointer hover:scale-125 transition hover:text-green-600 hover:overline"
      >
        <h2>Lifestyle</h2>
      </Link>
      <Link
        to="/facts"
        className="text-lg text-stone-700 cursor-pointer hover:scale-125 transition hover:text-green-600 hover:overline"
      >
        <h2>Facts</h2>
      </Link>
    </div>
  );
}

export default Community;
