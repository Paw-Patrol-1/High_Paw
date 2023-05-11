import React from "react";
import { useState } from "react";
import Community from "./Community";

function Profile() {

  const userStorage = localStorage.getItem("user");
 
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");


  return (



<div className="parent_div flex items-center bg-slate-50 flex-col h-auto">
      <h1 className="my-8 text-2xl">Profile</h1>
    
        <div className="name-div mb-4">
          <label
            htmlFor="name"
          
          >
           Name 
          </label>
     
        </div>

        <div className="age-div mb-4">
          <label
            htmlFor="age"
           
          >
            age
          </label>
      
        </div>
        <div className="breed-div mb-4">
          <label
            htmlFor="breed"
      
          >
            breed
          </label>
       
        </div>
        <div className="address-div mb-4">
          <label
            htmlFor="address"
           
          >
            <address></address>
          </label>
     
        </div>
        <div className="city-div mb-4">
          <label
            htmlFor="city"
           
          >
            city
          </label>
      
        </div>
       

     

  <div className="communityContainer mr-3 ">
  <Community />
</div>




 
      
     
</div>
             
   




   ); 
}

export default Profile;