import React, { useState } from "react";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



function UpdateProfile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [picture, setPicture] = useState("");
  const [breed, setBreed] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  // if (!id) {
  //   id = user.user._id;
  // }
  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`https://high-paw-production.up.railway.app/profile/${id}`, {

        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      setProfile(data);
      
    };
    getProfile();
  }, []);

  // const userStorage = localStorage.getItem("user");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      picture,
      name,
      age,
      breed,
      address,
      city,


    };
    const response = await fetch(`https://high-paw-production.up.railway.app/profile/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updatedProfile),
    });
    const data = await response.json();
    console.log(data);
    navigate(`/profile/${id}`);
  };

  return (

  

    // <>
    //   {profile && (
    <div className="parent_div flex items-center bg-slate-50 flex-col h-auto">
      <h1 className="my-8 text-2xl">Update Profile</h1>
      <form
        className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5"
        onSubmit={handleUpdate}
      >
        {/* <div className="picture-div mb-4">
          <label
            htmlFor="picture"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            picture
          </label>
          <input
            onChange={(e) => setPicture(e.target.value)}
            value={picture}
            type="file"
            id="picture"
            className="input-picture shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="add your picture here..."
          /> */}
          <div className="name-div mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              className="input-name shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="add your name here..."
            />
            <div className="age-div mb-4">
              <label
                htmlFor="age"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                age
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                value={age}
                type="text"
                id="age"
                className="input-age shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="{add your age here...}"
                />


            </div>
            <div className="breed-div mb-4">
              <label
                htmlFor="breed"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                breed
              </label>
              <input
                onChange={(e) => setBreed(e.target.value)}
                value={breed}
                type="text"
                id="breed"
                className="input-breed shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="add your breed here..."
              />
              <div className="address-div mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  id="address"
                  className="input-address shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="add your address here..."
                />
                <div className="city-div mb-4">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    city
                  </label>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    id="city"
                    className="input-city shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="add your city here..."
                  />



                </div>
                
              {/* </div> */}
            

            </div>
            
          </div>
          
        </div>
    
        <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update profile
        </button>
        
      </form>
  
  
    </div>
//       )}
// </>
    
  );
}

export default UpdateProfile;
