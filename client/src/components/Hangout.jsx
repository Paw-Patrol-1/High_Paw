import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, Link } from "react-router-dom";

function Hangout() {
  //taking id from route
  const { id } = useParams();
  const [hangout, setHangout] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    const getHangout = async () => {
      const response = await fetch(`http://localhost:8000/hangout/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      setHangout(data.hangout);
      console.log(data);
    };
    getHangout();
  }, []);

  const updateHangout = (id) => {
    console.log(id);
  };

  const deleteHangout = async (id) => {
    const response = await fetch(`http://localhost:8000/hangout/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <div>
      <p>this is the hangout</p>;
      {hangout && (
        <div
          className="parent border border-black w-10/12 m-auto mt-14 flex justify-between"
          key={hangout._id}
        >
          <div className="hangout border border-green-500 w-10/12 m-auto">
            <h2 className="title">{hangout.title}</h2>
            <p className="description">{hangout.description}</p>

            <p>{hangout.userId}</p>
            <div className="map w-auto h-96 border border-red-700">
              <SmallMap latLong={hangout.latLong} />
            </div>

            {hangout.userId === user.user._id && (
              <div className="parent-btn">
                <Link to={`/update_hangout/${id}`}>
                  {" "}
                  <button
                    className="btn my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateHangout(hangout._id)}
                  >
                    Update
                  </button>
                </Link>

                <button
                  className="btn my-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteHangout(hangout._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hangout;
