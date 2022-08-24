import React, { useState } from "react";
import { storeToken, storeUserData } from "../auth";
import { createUser } from "../api";

const Register = ({ setIsLoggedIn, setToken }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let password = event.target.password.value;
    let email = event.target.email.value;
    const registerInfo = await createUser(name, email, password);
    if (registerInfo && registerInfo.message) {
      alert(registerInfo.message);
    }
    const userData = {};
    userData.id = registerInfo.user.id;
    userData.name = registerInfo.user.name;
    userData.email = registerInfo.user.email;

    setToken(registerInfo.token);
    storeToken(registerInfo.token);
    storeUserData(userData);

    setName("");
    setEmail("");
    setPassword("");
    window.location.assign("/");
  };

  // Here's the return that shows up on the site
  return (
    <div className="compLogReg">
      <p className="logRegHeader">
        Sign up! (ONE OF US! ONE OF US! GOOBLE GOBBLE GOOBLE GOBBLE!)
      </p>
      <form className="loginForm" onSubmit={handleSubmit}>
        <fieldset className="fsLogReg">
          <legend>Register</legend>
          <div>
            <input
              className="loginInput"
              placeholder="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div>
            <input
              className="loginInput"
              placeholder="email"
              name="email"
              type="text"
              required
            />
          </div>
          <div>
            <input
              className="loginInput"
              placeholder="password"
              name="password"
              type="text"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
