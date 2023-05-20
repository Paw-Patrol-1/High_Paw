import Community from "./components/Community";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import CreateHangout from "./components/CreateHangout";
import Home from "./components/Home";
import { createContext, useState } from "react";
import Profile from "./components/Profile";
import Hangouts from "./components/Hangouts";
import Hangout from "./components/Hangout";
import UpdateHangout from "./components/UpdateHangout";
// import PaginatedItems from "./components/Pagination";
import ImageUpload from "./components/ImageUpload";

export const UserContext = createContext();

function App() {
  // check for user info in local storage
  const userStorage = JSON.parse(localStorage.getItem("user"));
  // if userstorage = null -> user = null, else user = userStorage
  const [user, setUser] = useState(userStorage);
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;

  return (
    <div className="parent-container  h-screen">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/update_hangout/:id" element={<UpdateHangout />} />
          <Route path="/hangout/:id" element={<Hangout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/create_hangout" element={<CreateHangout />} />
          <Route path="/hangouts" element={<Hangouts />} />
        </Routes>
        <div className="community">
          <Community />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
