import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function MyComponent({ saveMarker }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      // Remove any existing marker on the map
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add a new marker to the map
      const newMarker = L.marker([lat, lng], { icon }).addTo(map);
      saveMarker([lat, lng, newMarker]);
    },
  });

  return null;
}

function CreateHangout() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // useEffect(() => {
  // if user is null, redirect to login page
  if (!user) {
    window.location.href = "/login";
  }
  // }, [user]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marker, setMarker] = useState(null);

  const saveMarker = (newMarkerCoords) => {
    setMarker(newMarkerCoords);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHangout = {
      title,
      description,
      latLong: marker.slice(0, 2),
      userId: user.user._id,
      joining: [],
    };
    const response = await fetch(
      "https://high-paw-production.up.railway.app/hangout/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(newHangout),
      }
    );
    const data = await response.json();
    console.log(data);
    navigate("/");
  };

  return (
    <div className="parent_div flex items-center  flex-col h-auto">
      <form
        className="form bg-white shadow-md rounded px-6 pt-6 pb-6 mb-2 w-2/5 "
        onSubmit={handleSubmit}
      >
        <div className="title-div mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="title"
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text"
            placeholder="add your title here..."
          />
        </div>

        <div className="description-div mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700  font-semibold mb-2 text-xs"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name=""
            id="description"
            cols="30"
            rows="auto"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
            placeholder="add your description here..."
          ></textarea>
        </div>
        <div className="div-map">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Select location
          </p>
          <div className="mapContainer w-auto" style={{ marginBottom: "2em" }}>
            <MapContainer
              center={user.user.latLong}
              zoom={14}
              scrollWheelZoom={false}
              style={{ height: "40vh", width: "100%" }}
            >
              <TileLayer
                onClick={() => console.log("test")}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MyComponent saveMarker={saveMarker} />
            </MapContainer>
          </div>
        </div>
        <button className="btn bg-green-700 hover:bg-green-900 text-white font-medium py-2 px-4 rounded w-full">
          Create hangout
        </button>
      </form>
    </div>
  );
}

export default CreateHangout;
