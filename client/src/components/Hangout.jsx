import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, Link, useNavigate } from "react-router-dom";

function Hangout() {
  const [joiners, setJoiners] = useState({});
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
    const response = await fetch(
      `https://high-paw-production.up.railway.app/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    const data = await response.json();
    setProfile(data);
  };
  const getJoiners = async (joiners) => {
    for (let joiner of joiners) {
      const response = await fetch(
        `https://high-paw-production.up.railway.app/profile/${joiner}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setJoiners((prev) => {
        return { ...prev, [joiner]: data };
      });
    }
  };

  useEffect(() => {
    const getHangout = async () => {
      const response = await fetch(
        `https://high-paw-production.up.railway.app/hangout/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await response.json();
      // get the user who created the hangout
      getHangoutUser(data.hangout.userId);
      setHangout(data.hangout);
      console.log(data);
      getJoiners(data.hangout.joining);
    };
    getHangout();
  }, []);

  const updateHangout = (id) => {
    console.log(id);
  };

  const deleteHangout = async (id) => {
    const response = await fetch(
      `https://high-paw-production.up.railway.app/hangout/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    navigate("/hangouts");
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (hangout.joining.includes(user.user._id)) {
      alert("You have already joined this hangout");
      return;
    }
    const joinedHangout = {
      title: hangout.title,
      description: hangout.description,
      latLong: hangout.latLong,
      userId: hangout.userId,
      joining: [...hangout.joining, user.user._id],
    };
    const response = await fetch(
      `https://high-paw-production.up.railway.app/hangout/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(joinedHangout),
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.href = `/hangout/${id}`;
  };

  return (
    <div className="parent-container h-screen">
      {hangout && (
        <div
          className="parent  w-10/12 m-auto mt-8 flex justify-between"
          key={hangout._id}
        >
          <div className="hangout  w-10/12 m-auto ">
            <div className="wrapper-parent flex justify-between">
              <div className="wrapperTitleDescription">
                <h2 className="title text-stone-700 text-2xl">
                  {hangout.title}
                </h2>
                <p className="description text-stone-600 pb-10 w-11/12 leading-5 mt-5 text-sm">
                  {hangout.description}
                </p>
              </div>

              <div className="wrapperJoinersImg">
                <p>
                  <span className="font-semibold">Number of joiners: </span>
                  {hangout.joining.length}
                </p>
                {/* joiners */}
                <div className="joiners mt-10">
                  {hangout.joining.map((joiner) => (
                    <div className="joiner" key={joiner}>
                      {joiners[joiner] && (
                        <Link to={`/profile/${joiner}`} className="flex">
                          <p className="text-xs">
                            <em className="font-bold underline cursor-pointer mr-5">
                              {joiners[joiner].name}
                            </em>
                          </p>
                          <div className="avatar w-8 h-8 rounded-full drop-shadow-md">
                            <figure className="overflow-clip rounded-full border border-solid w-full h-full -mt-2 shadow-2xl">
                              <img
                                src={joiners[joiner].picture}
                                alt="profile picture"
                                className="rounded-full object-cover w-8 h-8  hover:scale-150  transition-all"
                              />
                            </figure>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="btn my-8 bg-green-600 transition-all hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-gray-800 shadow-2xl w-full"
              onClick={handleJoin}
            >
              Join
            </button>

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
                  <div className="text-xs flex w-52 mt-5 ">
                    <span className="font-light">Post created by: </span>
                    <Link
                      to={`/profile/${hangout.userId}`}
                      className="flex ml-4"
                    >
                      <em className="font-bold underline cursor-pointer">
                        {profile.name}
                      </em>
                      <div className="avatar w-8 h-8 rounded-full ">
                        <figure className="overflow-clip rounded-full border border-solid w-full h-full -mt-2 drop-shadow-md ml-3">
                          <img
                            src={profile.picture}
                            alt="profile picture"
                            className="rounded-full object-cover w-8 h-8 hover:scale-150 transition-all"
                          />
                        </figure>
                      </div>
                    </Link>
                  </div>
                )
              }
            </div>

            {hangout.userId === user.user._id && (
              <div className="parent-btn flex   justify-between  ">
                <Link to={`/update_hangout/${id}`}>
                  {" "}
                  <button
                    className="btn my-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-gray-800 shadow-2xl w-96"
                    onClick={() => updateHangout(hangout._id)}
                  >
                    Update
                  </button>
                </Link>

                <button
                  className="btn my-8 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded shadow-gray-800 shadow-2xl w-96 "
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
