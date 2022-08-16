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
    let name = event.target.name.value
    let password = event.target.password.value;
    let email = event.target.email.value;
    const registerInfo = await createUser(name, email, password);
    if (registerInfo && registerInfo.message) {
      alert(registerInfo.message);
    }
    const userData = {}
    userData.id = registerInfo.user.id
    userData.name = registerInfo.user.name
    userData.email = registerInfo.user.email
    setToken(registerInfo.token)
    storeToken(registerInfo.token)
    storeUserData(userData)

    // setIsLoggedIn(true);
    setName("");
    setEmail("");
    setPassword("");

  };

// Here's the return that shows up on the site
  return (
    <div>
      <p>ONE OF US! ONE OF US! GOOBLE GOBBLE GOOBLE GOBBLE!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              name="name"
              type="text"
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              name="email"
              type="text"
              required
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              name="password"
              type="text"
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
