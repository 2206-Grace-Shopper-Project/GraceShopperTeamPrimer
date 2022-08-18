import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Logout } from "./";


const Header = ({setToken, userDataObj}) =>{
    return(
      <>
      <header className="mainHeader">
      <NavLink to="/"><img id="logo" className="navlinks" src="https://i.imgur.com/7edncCx.png"/></NavLink>

        { userDataObj?.name ?
        <div>
        {/* <NavLink className="navlinks" to="/profile">{userDataObj.name}</NavLink> */}
            <a>{userDataObj.name}</a>
            <div className='dropdowndiv'>
                <NavLink className="dropdown-path" to="/users">View Profile</NavLink>
                <NavLink className="dropdown-path" to="/myreviews">My Reviews</NavLink>  
                <NavLink className="dropdown-path" to="/orders">Order History</NavLink>
              </div>
        </div>   
        :  <></>}

        <NavLink className="navlinks" to="/">Home</NavLink>
        {userDataObj?.name ? <Logout />  :  <NavLink to="/login-register" className="login-register-link">
          Login/Register
        </NavLink>}
        <NavLink className="navlinks" to="/carts"> <img id="cartLogo" className="navlinks" src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"/> </NavLink>
        </header>
      <br/>
      <Outlet/>
      </>
    )
}



export default Header