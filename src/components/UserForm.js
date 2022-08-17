import React from "react";
import { NavLink } from "react-router-dom";
import { MyReviews } from "./";


const UserForm = ({userDataObj}) =>{
    return(
        <div>
           <h1>Hello {userDataObj.name}</h1>
           <NavLink to="/myreviews">MyReviews</NavLink>
          
        </div>
        
    )
}



export default UserForm