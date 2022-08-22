import React from "react";
import { clearUsernameAndToken } from "../auth";

const Logout = () => {

  return (
    <span className="logout">
      <button id="logout-button" onClick={()=> {
        clearUsernameAndToken()
        window.location.assign("/");
      }}>
        Logout
      </button>
    </span>
  );
};

export default Logout;