import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl:
    "https://www.pngkit.com/png/detail/41-413073_5422c3418a632d4241caa626-home-icon-home-icons-for-website-png.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function Home() {
  const [hangouts, setHangouts] = useState([]);
  // importing env variables(need no installation of dotenv package for this to work, just need to add .env file in root directory, because of VITE_ prefix)
  const API_KEY = import.meta.env.VITE_MAPBOX_API;
  // console.log(import.meta.env.VITE_MAPBOX_API);

  const { user } = useContext(UserContext);
  console.log(user);
  // useEffect(() => {
  // if user is null, redirect to login page
  if (!user) {
    window.location.href = "/mainpage";
  }
  // }, [user]);

  useEffect(() => {
    const getHangouts = async () => {
      const response = await fetch(
        "https://high-paw-production.up.railway.app/hangout/all",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await response.json();
      setHangouts(data.hangouts);
      // console.log(data);
    };
    getHangouts();
  }, []);

  return (
    <div className="containerMap w-screen pt-28  md:flex-1  m-auto mt-14 bg-slate-50  md:pt-0">
      {/* if user exists show map, otherwise no map*/}
      {user.user && (
        <MapContainer
          center={user.user.latLong}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={user.user.latLong} icon={icon}></Marker>

          {hangouts.map((hangout) => (
            <div key={hangout._id} className="bg-slate-500">
              <Marker position={hangout.latLong}>
                <Popup>
                  <h2 className="title">{hangout.title}</h2>
                  <p className="description">
                    {hangout.description.slice(0, 100)}...
                  </p>

                  <Link to={`/hangout/${hangout._id}`}>See more details</Link>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Home;
