import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Logout } from "./";

const Header = ({ setToken, userDataObj }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const [currentHeader, setCurrentHeader] = useState('default')
console.log(active, 'drop down status')
console.log(currentHeader, 'drop down status current header')

  const handleOnChange = (event) =>{
    console.log(event.target.value)
    setCurrentHeader('default')
    setActive(false)
  navigate(event.target.value)
  }
  return (
    <>
      <header className="mainHeader">
        <NavLink className="websiteTitle" to="/">
          Cinema's Top 251
        </NavLink>

        {userDataObj?.name ? (
          <div>
            <p 
              id = "user-name" className="user-name"
              onClick={() => {
                console.log('i was cliocked')
                console.log(active)
                setActive(!active)
              }}
              // onMouseOut={()=>{document
              //   .getElementById("user-dropdown")
              //   .classList.remove("show-dropdown")}}
            >
              {userDataObj.name} ▾
            </p>
            <div id="user-dropdown" className={active ? "dropdown-content show-dropdown" : "dropdown-content"}>
            <select onChange={handleOnChange} defaultValue={currentHeader}>
            <option value={'default'} disabled ></option>  
            <option value='/users'>View Profile</option>
            <option value='/myreviews'>My Reviews</option>
            <option value='/orders'>Order History</option>
              
              {userDataObj.id === 5 ||
              userDataObj.id === 8 ||
              userDataObj.id === 9 ||
              userDataObj.id === 11 ? (
                <>
                <option  value="/add-movie">Add New Movie</option>
                <option value='/all-orders'>All Orders</option>
                <option value='/all-users'>All Users</option>
                </>
                
              ) : (
                <>
                
                </>
              )}</select>
              <Logout />
            </div>
          </div>
        ) : (
          <>
          <NavLink to="/login-register" className="login-register-link">
            Login/Register
          </NavLink>
          </>
        )}

        
        <NavLink className="navlinks" to="/carts">
          <span className="material-symbols-outlined">
          shopping_cart
          </span>
        </NavLink>
      </header>
      <br />
      <Outlet />
    </>
  );
};

export default Header;
