import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import Community from "./Community";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";

function Home() {
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;
  // console.log(import.meta.env.VITE_MAPBOX_API);

  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);
  // useEffect(() => {
  //   fetch(
  //     `https://api.mapbox.com/geocoding/v5/mapbox.places/822 fairview lane, new jersey.json?limit=1&access_token=${API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.features[0].geometry.coordinates));
  // }, []);

  return (
    <div className="parent-container">
      <div className="containerMapAndCommunity  w-screen flex justify-evenly">
        <div className="mapContainer w-9/12" style={{ marginTop: "2em" }}>
          <MapContainer
            center={[40.83335, -73.985023]}
            zoom={20}
            scrollWheelZoom={false}
            style={{ height: "70vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.83335, -73.985023]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="communityContainer">
          <Community />
        </div>
      </div>
    </div>
  );
}

export default Home;
