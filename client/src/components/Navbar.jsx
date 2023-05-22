import React from "react";
//
import { ReactComponent as Logo } from "./assets/Paw_Print.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    //send refresh token to backend to blacklist it
    console.log(user);
    // fetch("https://high-paw-production.up.railway.app/auth/refresh-token", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${user.refreshToken}`,
    //   },
    //   body: JSON.stringify({ refreshToken: user.refreshToken }),
    // });

    // remove user from state
    setUser(null);
    // remove user from local storage
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className=" flex flex-row  w-full justify-between border border-green-700">
      {/* set dimension to div holding the svg */}
      <div className="logo " style={{ height: "40px", width: "40px" }}>
        {/* give 100% w / h for the svg to fill its parent */}
        <Link to="/">
          {" "}
          <Logo style={{ width: "100%", height: "100%" }} />
        </Link>
      </div>
      <div
        className={`links gap-5  text-stone-600  border border-red-500 absolute ${
          showLinks ? "top-10" : "-top-72"
        } right-0 flex flex-col bg-white md:static md:flex-row md:mx-auto transition-all duration-500`}
      >
        <Link to="/profile" className="">
          profile
        </Link>
        <Link to="/hangouts">hangouts</Link>

        <Link to="/create_hangout">create hangout</Link>

        <div className="logoutBtn mr-3 md:absolute md:right-0">
          {user ? (
            <button
              className=" fill-stone-800 outline outline-offset-2 rounded-full mt-2   outline-red-900 px-4 shadow-2xl hover:bg-red-950 hover:text-white transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col md:flex-row">
              <Link
                className="outline outline-offset-2 rounded-full mt-2   outline-slate-700 px-4"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="outline outline-offset-2 rounded-full mt-2   outline-slate-700 px-4"
                to="/signup"
              >
                Register
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
      <button className="md:hidden" onClick={toggleNavbar}>
        <RxHamburgerMenu />
      </button>
    </div>
  );
}

export default Navbar;
