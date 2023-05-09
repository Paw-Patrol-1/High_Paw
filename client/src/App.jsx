import Community from "./components/Community";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import CreateHangout from "./components/CreateHangout";
import Home from "./components/Home";
import { useContext, createContext, useState } from "react";
import Profile from "./components/Profile";
import Hangouts from "./components/Hangouts";

export const UserContext = createContext();

function App() {
  // check for user info in local storage
  const userStorage = JSON.parse(localStorage.getItem("user"));
  // if userstorage = null -> user = null, else user = userStorage
  const [user, setUser] = useState(userStorage);
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;
  // console.log(import.meta.env.VITE_MAPBOX_API);

  // useEffect(() => {
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/822 fairview lane, new jersey.json?limit=1&access_token=${API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.features[0].geometry.coordinates));
  // }, []);

  return (
    <div className="parent-container">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create_hangout" element={<CreateHangout />} />
          <Route path="/hangouts" element={<Hangouts />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
