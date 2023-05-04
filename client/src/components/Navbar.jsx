import React from "react";
//
import { ReactComponent as Logo } from "../assets/Paw_Print.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="h-auto flex flex-row justify-between w-full">
      {/* set dimension to div holding the svg */}
      <div className="logo " style={{ height: "40px", width: "40px" }}>
        {/* give 100% w / h for the svg to fill its parent */}
        <Link to="/">
          {" "}
          <Logo style={{ width: "100%", height: "100%" }} />
        </Link>
      </div>
      <div className="links gap-5 flex">
        <Link to="/profile">profile</Link>
        <Link to="/hangouts">hangouts</Link>
        <Link to="/create_hangout">create hangout</Link>
      </div>

      <div className="logoutBtn mr-3">
        <button className="outline outline-offset-2 rounded-full mt-2   outline-slate-700 px-4">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
