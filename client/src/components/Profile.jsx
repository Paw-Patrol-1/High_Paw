import React from "react";
import {UserContext} from "../App"
import { useState, useContext, useEffect } from "react";

import { useParams } from "react-router-dom";




function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [profiles, setProfiles] = useState ([]);

  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);


  const editProfile = async () => {
    const { id } = useParams();
    const [picture, setPicture] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
  
  const response = await fetch(`http://localhost:8000/profile//edit/${id}`, {
       method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
     });
    const data = await response.json();
    console.log(data);
     window.location.reload();
   };



  return (


    <div className="parent_div flex items-center bg-slate-50 flex-col h-auto">
    <h1 className="my-8 text-2xl">Profile</h1>
    <div className="name-div mb-4">
      <label htmlFor="name"> {user.user.picture}</label>
    </div>
    <div className="name-div mb-4">
      <label htmlFor="name">Name: {user.user.name}</label>
    </div>

    <div className="age-div mb-4">
      <label htmlFor="age">Age: {user.user.age}</label>
    </div>
    <div className="breed-div mb-4">
      <label htmlFor="breed">Breed: {user.user.breed}</label>
    </div>
    <div className="address-div mb-4">
      <label htmlFor="address">
        <address>Address: {user.user.address}</address>
      </label>
    </div>
    <div className="city-div mb-4">
      <label htmlFor="city">City: {user.user.city}</label>
    </div>
    <button
                  className="btn my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => editProfile(user.user._id)}
                >
                  update
                </button>
    {/* <div className="communityContainer mr-3 ">
      <Community />
    </div> */}
   
  </div>
);
}


export default Profile;

