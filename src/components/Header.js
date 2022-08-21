import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "./";

const Header = ({ setToken, userDataObj }) => {
  return (
    <>
      <header className="mainHeader">
        <NavLink className="websiteTitle" to="/">
          {/* <img
            id="logo"
            className="navlinks"
            src="https://i.imgur.com/7edncCx.png"
          /> */}
          Cinema's Top 251
        </NavLink>

        {userDataObj?.name ? (
          <div>
            <p 
              id = "user-name" className="user-name"
              onClick={() => {
                document
                  .getElementById("user-dropdown")
                  .classList.toggle("show-dropdown");
              }}
            >
              {userDataObj.name} ▾
            </p>
            <div id="user-dropdown" className="dropdown-content">
              <NavLink to="/users">View Profile</NavLink>
              <NavLink to="/myreviews">My Reviews</NavLink>
              <NavLink to="/orders">Order History</NavLink>
              {userDataObj.id === 5 ||
              userDataObj.id === 8 ||
              userDataObj.id === 9 ||
              userDataObj.id === 11 ? (
                <div className="dropdowndiv">
                  <NavLink to="/add-movie">Add New Movie</NavLink>
                  <NavLink to="/all-orders">All Orders</NavLink>
                  <NavLink to="/all-users">All Users</NavLink>
                </div>
              ) : (
                <></>
              )}
              <Logout />
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* <NavLink className="navlinks" to="/">
          Home
        </NavLink> */}
        {userDataObj?.name ? (
          null
        ) : (
          <NavLink to="/login-register" className="login-register-link">
            Login/Register
          </NavLink>
        )}
        <NavLink className="navlinks" to="/carts">
          {/* {" "} */}
          <span className="material-symbols-outlined">
          shopping_cart
          </span>
          {/* <img
            id="cartLogo"
            className="navlinks"
            src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"
          />{" "} */}
        </NavLink>
      </header>
      <br />
      <Outlet />
    </>
  );
};

export default Header;
