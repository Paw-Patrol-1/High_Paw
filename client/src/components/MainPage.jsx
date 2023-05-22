import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="h-5/6 border border-black flex items-center justify-center">
      <section className="absolute left-2/3 -ml-7">
        <h1 className="text-5xl ">high</h1>
        <div className="svg"></div>
      </section>
      <section className="btn">
        <Link to="/login" className="absolute top-2/4 left-1/4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            login
          </button>
        </Link>
        <Link to="/signup" className="absolute bottom-72 left-72">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            signup
          </button>
        </Link>
      </section>
    </div>
  );
}

export default MainPage;
