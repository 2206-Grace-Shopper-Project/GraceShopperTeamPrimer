import React from "react";
import { NavLink, Outlet } from "react-router-dom";


const Header = ({setToken}) =>{
    return(
      <>
      <header className="mainHeader">
      <NavLink to="/"><img id="logo" className="navlinks" src="https://i.imgur.com/7edncCx.png"/></NavLink>
          {/* {  currentUser ?  <NavLink className="navlinks" to="/profile">Profile</NavLink>  :  <></>} */}
        <NavLink className="navlinks" to="/">Home</NavLink>
        <NavLink className="navlinks" to="/carts"> <img id="cartLogo" className="navlinks" src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"/> </NavLink>
      {/* {  currentUser ? <Logout setToken={setToken} setCurrentUser={setCurrentUser}/>  :  <></>} */}
        </header>
      <br/>
      <Outlet/>
      </>
    )
}



export default Header