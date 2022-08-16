import React, { useState } from "react";


const Register = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

  // This function will go to the api / index when necessary
  async function createUser(name, email, password){
    try{ 
      console.log(email, name, password)
      const response = await 
          fetch(`${BASE}/users/register`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
            })
          });
          const result = await response.json();
          return result
    } catch (error){
      console.log(error)
    }
  };
  
  // <<< ENd of that Function
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("i am submitting");
    const registerInfo = await createUser(name, email, password);
    console.log(registerInfo);
    if (registerInfo && registerInfo.message) {
      alert(registerInfo.message);
    }

    localStorage.setItem("token", registerInfo.token);
    localStorage.setItem()
    setIsLoggedIn(true);
    setUsername("");
    setPassword("");
  };

// Here's the return that shows up on the site
  return (
    <div>
      <p>ONE OF US! ONE OF US! GOOBLE GOBBLE GOOBLE GOBBLE!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            NAME
            <input
              name="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                console.log(name);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            EMAIL
            <input
              name="email"
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                console.log(email);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              name="password"
              type="text"
              value={password}
              onChange={(event) => {
                console.log(event.target.value);
                setPassword(event.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Register;
