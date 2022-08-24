import React, { useState } from "react";
import { storeToken, storeUserData } from "../auth";
import { loginUser } from "../api";
import "./extra.css"

const Login = ({ setIsLoggedIn, setToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    let password = event.target.password.value;
    let email = event.target.email.value;
    const loginInfo = await loginUser(email, password);
    if (loginInfo && loginInfo.message) {
      alert(loginInfo.message);
    }
    const userData = {}
    userData.id = loginInfo.user.id
    userData.name = loginInfo.user.name
    userData.email = loginInfo.user.email
    console.log(loginInfo.user.password)
    setToken(loginInfo.token)
    storeToken(loginInfo.token)
    storeUserData(userData)
    console.log(loginInfo);

    // setIsLoggedIn(true);
    setEmail("");
    setPassword("");
    window.location.assign("/");
  };


  return (
    <div className="compLogReg">
      <p className="logRegHeader">Welcome Back</p>
      <form className="loginForm" onSubmit={handleSubmit}>
        <fieldset className="fsLogReg">
          <legend>Login</legend>
        <div>
            <input
              className="loginInput"
              name="email"
              type="text"
              placeholder="email"
            />
        </div>
        <div>
            <input
              className="loginInput"
              name="password"
              type="password"
              placeholder="password"
            />
        </div>
        <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
