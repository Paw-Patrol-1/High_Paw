import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

function Hangouts() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    // if user is null, redirect to login page
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);
  return <div>Hangouts</div>;
}

export default Hangouts;
