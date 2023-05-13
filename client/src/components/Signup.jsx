import React from "react";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/auth/register", form)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="parentContainer flex items-center w-auto h-auto">
      {/* <div className='parentSvg' style={{border: "1px solid red", height: "100vh", width: "100vw"}}> 
    <PawSteps style={{height: "100%"}} > */}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 flex flex-col mx-auto my-20 z-80"
        onSubmit={handleSubmit}
      >
        <h1 className="login font-semibold mb-4">Signup</h1>
        <div className="childOne mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="childTwo mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Breed"
            value={form.breed}
            onChange={handleChange}
            name="breed"
          />
        </div>
        <div className="childThree mb-2">
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            name="age"
          />
        </div>
        {/* <div className="relative mb-3" data-te-input-wrapper-init>
          <input
            type="number"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInputNumber"
            placeholder="Example label"
          />
          <label
            htmlFor="exampleFormControlInputNumber"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Number input
          </label>
        </div> */}
        <div className="childFour mb-2">
          <label htmlFor="img">Upload image</label>
          <input
            id="img"
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>
        <div className="childFive mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="123 Address Street"
            value={form.address}
            onChange={handleChange}
            name="address"
          />
        </div>
        <div className="childSix mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            name="city"
          />
        </div>

        <div className="childSeven mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="childEight mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Please enter password"
            value={form.password}
            onChange={handleChange}
            name="password"
          />
        </div>

        <div className="childEight mb-2">
          <input
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Confirm  password"
            value={form.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>

        <div>
          <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Signup
          </button>
          <p>
            Already have an account? click here to <strong>Login</strong>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
