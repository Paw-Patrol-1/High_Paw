import React from "react";
import { useState } from "react";
import axios from "axios";

import adressToLatLong from "../../utils/adressToLatLong";
import { useNavigate, Link } from "react-router-dom";

// import UploadWidget from "./UploadImage";

function Signup() {
  const preset_key = "rmfpv4pk";

  function handleFile(event) {
    const selectedImages = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedImages);
    formData.append("upload_preset", preset_key);
    axios
      .post("https://api.cloudinary.com/v1_1/dhknz3izf/image/upload", formData)
      .then((response) =>
        setForm({ ...form, picture: response.data.secure_url })
      )
      .catch((error) => console.log(error));
  }
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    picture: "",
    address: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const latLong = await adressToLatLong(form.address, form.city);
    if (!latLong || !latLong.length) {
      return alert("Please enter a valid address");
    }
    console.log(latLong);
    axios
      .post("https://high-paw-production.up.railway.app/auth/register", {
        ...form,
        latLong,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
    navigate("/login");
  };

  return (
    <div className="parentContainer w-screen   md:flex-1  m-auto   md:pt-0 px-5 lg:w-2/5 ">
      {/* <div className='parentSvg' style={{border: "1px solid red", height: "100vh", width: "100vw"}}> 
    <PawSteps style={{height: "100%"}} > */}
      <form
        className="bg-white shadow-md rounded md:px-8 md:pt-6 px-2 pb-8 mb-4  md:w-4/5 flex flex-col mx-auto md:my-20 z-80 xl:w-2/5 lg:w-3/5"
        onSubmit={handleSubmit}
      >
        <h1 className="login font-semibold mb-4 text-2xl text-stone-700">
          Signup
        </h1>
        <div className="childOne mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="childTwo mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="text"
            placeholder="Breed"
            value={form.breed}
            onChange={handleChange}
            name="breed"
          />
        </div>
        <div className="childThree mb-2">
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            name="age"
          />
        </div>

        <div className="childFour mb-2">
          <label htmlFor="img">Upload image</label>
          <input
            id="img"
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="file"
            placeholder="123 Address Street"
            onChange={handleFile}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div className="childFive mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="text"
            placeholder="123 Address Street"
            value={form.address}
            onChange={handleChange}
            name="address"
          />
        </div>
        <div className="childSix mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="text"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            name="city"
          />
        </div>

        <div className="childSeven mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="childEight mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="password"
            placeholder="Please enter password"
            value={form.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <div className="childEight mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            type="password"
            placeholder="Confirm  password"
            value={form.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>

        <div>
          <button className="btn bg-transparent border border-green-700 hover:border-0 hover:bg-green-600 text-green-900 hover:text-green-50 transition delay-0 text-xl font-normal py-2 px-4 rounded-full w-full mt-8 shadow-green-700 shadow-sm">
            Signup
          </button>
          <p className="text-stone-700">
            Already have an account? Click here to{" "}
            <Link to="/login">
              <strong>Login</strong>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
