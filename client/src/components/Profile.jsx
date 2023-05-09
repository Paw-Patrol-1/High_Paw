import React from "react";

function Profile() {
  const userStorage = localStorage.getItem("user");
  console.log(userStorage);

  return <div>Profile</div>;
}

export default Profile;
