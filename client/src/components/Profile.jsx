import React from "react";

import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import Community from "./Community";

function Profile() {
  const [profile, setProfile] = useState(null);
  let { id } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  if (!id) {
    id = user.user._id;
  }
  useEffect(() => {
    const getProfile = async () => {
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
      console.log(data);
    };
    getProfile();
  }, []);

  const userStorage = localStorage.getItem("user");

  return (
    <>
      {profile && (
        <div className="parent_div flex flex-row items-center  h-auto gap-20 justify-start ">
          <div className="blop  ml-20 ">
            <svg
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <clipPath id="a">
                  <path fill="currentColor">
                    <animate
                      attributeName="d"
                      dur="10s"
                      repeatCount="indefinite"
                      values="M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z;

                    M866.5 647Q851 794 707 826t-241-33.5Q369 727 205.5 697T123 529.5Q204 392 259.5 286t180-126.5Q564 139 718.5 163t159 180.5Q882 500 866.5 647Z;
                    
                    M755 602.5Q744 705 664.5 843t-239 100.5Q266 906 196 771t-14.5-251Q237 404 266 274.5t164.5-138Q566 128 723.5 154t100 186Q766 500 755 602.5Z;


                    M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z"
                    ></animate>
                  </path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)">
                <path stroke="green" strokeWidth="20">
                  <animate
                    attributeName="d"
                    dur="10s"
                    repeatCount="indefinite"
                    values="M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z;

                    M866.5 647Q851 794 707 826t-241-33.5Q369 727 205.5 697T123 529.5Q204 392 259.5 286t180-126.5Q564 139 718.5 163t159 180.5Q882 500 866.5 647Z;
                    
                    M755 602.5Q744 705 664.5 843t-239 100.5Q266 906 196 771t-14.5-251Q237 404 266 274.5t164.5-138Q566 128 723.5 154t100 186Q766 500 755 602.5Z;


                    M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z"
                  ></animate>
                </path>
              </g>
              <image
                href={profile.picture}
                alt="profile picture"
                clipPath="url(#a)"
                width="100%"
                height="100%"
              />
            </svg>
          </div>
          {/* add glow */}
          <div
            className="blop  ml-20 absolute -z-10"
            style={{ filter: "blur(30px)" }}
          >
            <svg
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <clipPath id="a">
                  <path fill="currentColor">
                    <animate
                      attributeName="d"
                      dur="10s"
                      repeatCount="indefinite"
                      values="M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z;

                    M866.5 647Q851 794 707 826t-241-33.5Q369 727 205.5 697T123 529.5Q204 392 259.5 286t180-126.5Q564 139 718.5 163t159 180.5Q882 500 866.5 647Z;
                    
                    M755 602.5Q744 705 664.5 843t-239 100.5Q266 906 196 771t-14.5-251Q237 404 266 274.5t164.5-138Q566 128 723.5 154t100 186Q766 500 755 602.5Z;


                    M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z"
                    ></animate>
                  </path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)">
                <path stroke="#444cf7" strokeWidth="20">
                  <animate
                    attributeName="d"
                    dur="10s"
                    repeatCount="indefinite"
                    values="M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z;

                    M866.5 647Q851 794 707 826t-241-33.5Q369 727 205.5 697T123 529.5Q204 392 259.5 286t180-126.5Q564 139 718.5 163t159 180.5Q882 500 866.5 647Z;
                    
                    M755 602.5Q744 705 664.5 843t-239 100.5Q266 906 196 771t-14.5-251Q237 404 266 274.5t164.5-138Q566 128 723.5 154t100 186Q766 500 755 602.5Z;


                    M857 655.5q14 155.5-134.5 209t-300.5 44Q270 899 223.5 758T154 491.5Q131 366 244 309t223.5-155q110.5-98 178 34.5t132.5 222q65 89.5 79 245Z"
                  ></animate>
                </path>
              </g>
              <image
                href={profile.picture}
                alt="profile picture"
                clipPath="url(#a)"
                width="100%"
                height="100%"
              />
            </svg>
          </div>
          <div className="info">
            <h1 className="my-8 text-5xl text-gray-700">My profile</h1>

            <div className="name-div mb-4 text-gray-700">
              <h3>
                Name: <span className="font-semibold">{profile.name}</span>
              </h3>
            </div>

            <div className="age-div mb-4 text-gray-700">
              <h3>
                Age:<span className="font-semibold">{profile.age}</span>
              </h3>
            </div>
            <div className="breed-div mb-4 text-gray-700">
              <h3>
                Breed: <span className="font-semibold">{profile.breed}</span>
              </h3>
            </div>

            <div className="city-div mb-4 text-gray-700">
              <h3>
                City: <span className="font-semibold">{profile.city}</span>
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
