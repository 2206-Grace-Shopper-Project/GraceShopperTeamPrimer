import React, { useState } from "react";
import { storeToken, storeUserData } from "../auth";
// import { loginUser } from "../api";

const Login = ({ setIsLoggedIn, setToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // STUFF THAT WILL PROBABLY GO AWAY AFTER THE MERGE
  const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

  async function loginUser(email, password) {
    try {
      const response = await fetch(`${BASE}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error;
    }
  }

  // <<<<<<<

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
    // window.location.assign("/");
  };


  return (
    <div>
      <p>Welcome Back</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            email:
            <input
              name="email"
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              name="password"
              type="text"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
