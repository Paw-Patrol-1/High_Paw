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
        className={`links gap-5  text-stone-600   absolute ${
          showLinks ? "top-10" : "-top-72"
        } right-0 flex flex-col bg-white md:static text-lg px-4  md:flex-row md:mx-auto transition-all duration-500`}
      >
        <Link
          onClick={() => handleClick("profile")}
          to="/profile"
          className={`text-stone-700 hover:font-semibold transition duration-300 hover:bg-green-400 my-2 mx-2 px-2 rounded-lg hover:text-white  hover:shadow-xl ${
            clickedLink === "profile" ? "bg-green-500 text-white shadow-xl" : ""
          }`}
        >
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
          hangouts
        </Link>

        <Link
          onClick={() => handleClick("create_hangout")}
          to="/create_hangout"
          className={`text-stone-700 hover:font-semibold transition duration-300 hover:bg-green-400 my-2 mx-2 px-2 rounded-lg hover:text-white  hover:shadow-xl ${
            clickedLink === "create_hangout"
              ? "bg-green-500 text-white shadow-xl"
              : ""
          }`}
        >
          create hangout
        </Link>

        <div className="logoutBtn mr-3 md:absolute md:right-0">
          {user ? (
            <a
              className=" text-red-600 text-xl font-semibold hover:text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </a>
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
