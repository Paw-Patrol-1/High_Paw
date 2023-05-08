import Community from "./components/Community";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import CreateHangout from "./components/CreateHangout";
import Home from "./components/Home";

function App() {
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;
  console.log(import.meta.env.VITE_MAPBOX_API);

  // useEffect(() => {
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/822 fairview lane, new jersey.json?limit=1&access_token=${API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.features[0].geometry.coordinates));
  // }, []);

  return (
    <div className="parent-container">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/create_hangout" element={<CreateHangout />} />
      </Routes>
    </div>
  );
}

export default App;
