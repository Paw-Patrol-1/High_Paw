import React from "react";
import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="communityContainer  w-24  ml-6 bg-white shadow-sm h-auto -mt-[520px]">
      <h1 className="h1 mb-2 font-bold">Community</h1>
      <Link to="/recipes"><h2>Recipes</h2></Link>
      <Link to="/lifestyle"><h2>Lifestyle</h2></Link>
      <Link to="/facts"><h2>Facts</h2></Link>
    </div>
  );
}

export default Community;
