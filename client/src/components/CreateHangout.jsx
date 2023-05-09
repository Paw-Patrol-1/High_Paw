import React from "react";
import { useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMapEvents } from "react-leaflet";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

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
      L.marker([lat, lng], { icon }).addTo(map);
      saveMarker([lat, lng]);
    },
  });
  return null;
}

function CreateHangout() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marker, setMarker] = useState(null);

  const saveMarker = (newMarkerCoords) => {
    setMarker(newMarkerCoords);
  };
  return (
    <div className="parent_div flex items-center bg-slate-50 flex-col h-auto">
      <h1 className="my-8 text-2xl">Create Hangout</h1>
      <form className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5">
        <div className="title-div mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            id="title"
            className="input-title shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="add your title here..."
          />
        </div>

        <div className="description-div mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name=""
            id="description"
            cols="30"
            rows="auto"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="add your description here..."
          ></textarea>
        </div>
        <div className="div-map">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Select location
          </p>
          <div className="mapContainer w-auto" style={{ marginBottom: "2em" }}>
            <MapContainer
              center={[40.83335, -73.985023]}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "50vh", width: "100%" }}
            >
              <TileLayer
                onClick={() => console.log("test")}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MyComponent saveMarker={saveMarker} />
              {/* <Marker position={[40.83335, -73.985023]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
            </MapContainer>
          </div>
        </div>
        <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          create hangout
        </button>
      </form>
    </div>
  );
}

export default CreateHangout;
