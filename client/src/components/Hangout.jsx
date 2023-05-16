import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, Link, useNavigate } from "react-router-dom";

function Hangout() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  //taking id from route
  const { id } = useParams();
  const [hangout, setHangout] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);
  const getHangoutUser = async (id) => {
    const response = await fetch(`http://localhost:8000/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    const getHangout = async () => {
      const response = await fetch(`http://localhost:8000/hangout/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      // get the user who created the hangout
      getHangoutUser(data.hangout.userId);
      setHangout(data.hangout);
      console.log(data);
    };
    getHangout();
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
    navigate("/hangouts");
  };
  return (
    <div className="bg-slate-50 ">
      {hangout && (
        <div
          className="parent  w-10/12 m-auto mt-8 flex justify-between"
          key={hangout._id}
        >
          <div className="hangout  w-10/12 m-auto">
            <h2 className="title text-stone-700 text-2xl">{hangout.title}</h2>
            <p className="description text-stone-600 pb-10">
              {hangout.description}
            </p>
            <div className="user">
              {/* {
               
                profile && <p>Post created by {profile.name}</p>
              } */}
            </div>
            <div className="map w-auto h-96 border  shadow-xl">
              <SmallMap latLong={hangout.latLong} />
            </div>
            <div className="user">
              {
                /* if profile is not null, display the profile picture */
                profile && (
                  <p className="text-xs">
                    Post created by{" "}
                    <em className="font-bold underline cursor-pointer">
                      {profile.name}
                    </em>
                  </p>
                )
              }
            </div>

            {hangout.userId === user.user._id && (
              <div className="parent-btn flex gap-4 ">
                <Link to={`/update_hangout/${id}`}>
                  {" "}
                  <button
                    className="btn my-8 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-gray-800 shadow-2xl"
                    onClick={() => updateHangout(hangout._id)}
                  >
                    Update
                  </button>
                </Link>

                <button
                  className="btn my-8 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-gray-800 shadow-2xl"
                  onClick={() => deleteHangout(hangout._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hangout;
