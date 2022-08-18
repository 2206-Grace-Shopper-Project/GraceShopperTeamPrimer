import React from "react";
import { clearUsernameAndToken } from "../auth";

const Logout = () => {

  return (
    <div className="logout">
      <button id="logout-button" onClick={()=> {
        clearUsernameAndToken()
        window.location.assign("/");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Logout;