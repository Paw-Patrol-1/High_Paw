import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { Link } from "react-router-dom";
// import "tailwindcss/tailwind.css";

function Hangouts() {
  const [hangouts, setHangouts] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    const getHangouts = async () => {
      const response = await fetch("http://localhost:8000/hangout/all", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      setHangouts(data.hangouts);
      // console.log(data);
    };
    getHangouts();
  }, []);

  const updateHangout = (id) => {
    console.log(id);
  };

  const deleteHangout = async (id) => {
    const response = await fetch(`http://localhost:8000/hangout/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <div className="h-screen bg-slate-50">
      Hangouts
      {hangouts.map((hangout, index) => (
        <div
          className={` shadow-xl w-10/12 m-auto mt-14 flex justify-between ${
            index % 2 === 0 ? "flex-row-reverse" : "flex-row"
          }`}
          key={hangout._id}
        >
          <div className="hangout  w-3/4 px-6 ">
            <Link to={`/hangout/${hangout._id}`}>
              <h2 className="title text-3xl text-stone-700 underline mb-6">
                {hangout.title}
              </h2>
            </Link>
            <p className="description text-stone-600">{hangout.description}</p>
            {/* <p>{hangout.userId}</p> */}
          </div>
          <div className="img border border-black  w-3/12 h-auto mr">
            {/* <img src={hangout.img} alt="hangout" /> */}
            <SmallMap latLong={hangout.latLong} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hangouts;
