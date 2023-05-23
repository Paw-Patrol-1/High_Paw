import React from "react";
import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="communityContainer  bg-white shadow-sm  border border-red-800 h-56 w-full md:w-48 md:h-3/4 px-4 pb-0 ">
      <h1 className="h1 mb-2 font-bold">Community</h1>
      <Link to="/recipes">
        <h2>Recipes</h2>
      </Link>
      <Link to="/lifestyle">
        <h2>Lifestyle</h2>
      </Link>
      <Link to="/facts">
        <h2>Facts</h2>
      </Link>
    </div>
  );
}

export default Community;
