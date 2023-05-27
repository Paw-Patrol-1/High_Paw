import Community from "./components/Community";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import CreateHangout from "./components/CreateHangout";
import Home from "./components/Home";
import { createContext, useState } from "react";
import Profile from "./components/Profile";
import Hangouts from "./components/Hangouts";
import Hangout from "./components/Hangout";
import UpdateHangout from "./components/UpdateHangout";
import ImageUpload from "./components/ImageUpload";
// import ThemeSwitcher from "./components/ThemeSwitcher";
import LifeStyle from "./components/LifeStyle";
import Recipes from "./components/Recipes";
import FactsPaginate from "./components/FactsPaginate";
import SingleFact from "./components/SingleFact";

import { useThemeContext } from "./components/ThemeProvider";

export const UserContext = createContext();

function App() {
  const { theme } = useThemeContext();
  // check for user info in local storage
  const userStorage = JSON.parse(localStorage.getItem("user"));
  // if userstorage = null -> user = null, else user = userStorage
  const [user, setUser] = useState(userStorage);
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;

  return (
    <div
      className={`parent-container -z-10 min-h-screen ${
        theme === "light" ? "bg-white text-gray-700" : "bg-black text-white"
      }`}
      // className="parent-container  -z-10 bg-white"
    >
      {/* <ThemeProvider> */}
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Navbar />
        <div className="parentRoutesCommunity flex flex-col md:flex-row h-full w-full ">
          <Routes>
            <Route path="/mainpage" element={<MainPage />} />
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
            <Route path="/lifestyle" element={<LifeStyle />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/facts" element={<FactsPaginate itemsPerPage={4} />} />
            <Route path="/:name" element={<SingleFact />} />
          </Routes>

          <Community />
        </div>
      </UserContext.Provider>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
