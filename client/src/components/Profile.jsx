import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

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
      const response = await fetch(`http://localhost:8000/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
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
        <div className="parent_div flex flex-row items-center bg-slate-50 flex-coljustify-between h-auto gap-20 justify-start ">
          <div className="img-div border border-black h-60 w-40 ml-20"></div>
          <div className="info">
            <h1 className="my-8 text-2xl">Profile</h1>

            <div className="name-div mb-4">
              <h3>Name: {profile.name}</h3>
            </div>

            <div className="age-div mb-4">
              <h3>Age: {profile.age}</h3>
            </div>
            <div className="breed-div mb-4">
              <h3>Breed: {profile.breed}</h3>
            </div>

            <div className="city-div mb-4">
              <h3>City: {profile.city}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
