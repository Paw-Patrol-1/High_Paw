import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";

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
  return (
    <div>
      Hangouts
      {hangouts.map((hangout) => (
        <div
          className="parent border border-black w-10/12 m-auto mt-14 flex justify-between"
          key={hangout._id}
        >
          <div className="hangout">
            <h2 className="title">{hangout.title}</h2>
            <p className="description">{hangout.description}</p>
          </div>
          <div className="img border border-black h-auto w-3/12">
            {/* <img src={hangout.img} alt="hangout" /> */}
            <p>{hangout.latLong}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hangouts;
