import React from "react";
import { NavLink } from "react-router-dom";
import { MyReviews } from "./";


const UserForm = () =>{
    return(
        <div>
           <h1>Hello</h1>
           <NavLink to="/myreviews">MyReviews</NavLink>
           <Routes>
           <Route path='/myreviews' element={<MyReviews setToken={setToken} token={token}/>}/>
           </Routes>
        </div>
        
    )
}



export default UserForm