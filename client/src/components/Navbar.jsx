import React from "react";
// testing
import { ReactComponent as Logo } from "./assets/Paw_Print.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const [clickedLink, setClickedLink] = useState("");
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
  //if a link is clicked, set bg color to green
  const handleClick = (link) => {
    setClickedLink(link);
  };

  return (
    <div className=" flex flex-row  w-full justify-between shadow-green-500 shadow-lg">
      {/* set dimension to div holding the svg */}
      <div className="logo" style={{ height: "40px", width: "40px" }}>
        {/* give 100% w / h for the svg to fill its parent */}

        <Link to="/" className="animate-pulse ">
          {" "}
          <Logo style={{ width: "100%", height: "100%" }} />
        </Link>
      </div>

      <div
        className={`links gap-5  text-stone-600 z-50   absolute ${
          showLinks ? "top-10" : "-top-72"
        } right-0 flex flex-col bg-white opacity-70 md:static text-lg px-4  md:flex-row md:mx-auto transition-all duration-500`}
      >
        <Link
          onClick={() => handleClick("profile")}
          to="/profile"
          className={`text-stone-700 hover:font-semibold transition duration-300 hover:bg-green-400 my-2 mx-2 px-2 rounded-lg hover:text-white  hover:shadow-xl ${
            clickedLink === "profile" ? "bg-green-500 text-white shadow-xl" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#379237"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#54B435"
            className="w-6 h-6 hover:fill-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          profile
        </Link>
        <Link
          onClick={() => handleClick("hangouts")}
          to="/hangouts"
          className={`text-stone-700 hover:font-semibold transition duration-300 hover:bg-green-400 my-2 mx-2 px-2 rounded-lg hover:text-white  hover:shadow-xl ${
            clickedLink === "hangouts"
              ? "bg-green-500 text-white shadow-xl"
              : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#379237"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#54B435"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          hangouts
        </Link>

        <Link
          onClick={() => handleClick("create_hangout")}
          to="/create_hangout"
          className={`text-stone-700  hover:font-semibold transition duration-300 hover:bg-green-400 my-2 mx-2 px-2 rounded-lg hover:text-white  hover:shadow-xl ${
            clickedLink === "create_hangout"
              ? "bg-green-500 text-white shadow-xl"
              : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#379237"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#54B435"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          create hangout
        </Link>

        <div className="logoutBtn mr-3 md:absolute md:right-0">
          {user ? (
            <a
              className=" text-red-600 text-xl font-semibold hover:text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 md:mt-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>

              {/* Logout */}
            </a>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <Link
                className=" mt-2  text-green-500 hover:text-green-600 text-lg"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="mt-2  text-green-500 hover:text-green-600 text-lg"
                to="/signup"
              >
                Register
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
      <button
        className="md:hidden  text-2xl text-green-500"
        onClick={toggleNavbar}
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
}

export default Navbar;
