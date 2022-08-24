import React, {useState} from 'react';
import { storeUserData } from '../auth';
import "./extra.css"

// goes into API INDEX
export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;


export async function updateEmail(userId, updateObj){
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`${BASE}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateObj),
        });
        const result = await response.json();
        return result;  
    } catch (error) {
        console.error;
    }
}
// END OF (goes into API INDEX)



const UpdateEmail = ({setShowUpdateEmail, userDataObj,setUserDataObj}) => {

const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id
    const name = userDataObj.name
    const email = event.target.newEmail.value
    const updateObj = {}
    updateObj.name = name
    updateObj.email = email
    updateObj.id = userId
    
    await updateEmail(userId, updateObj), 
    setShowUpdateEmail(false)
    setUserDataObj(updateObj)
    storeUserData(updateObj)
  };

    return(
        <div>
            
            <form onSubmit={handleSubmit}>
               <div><label>New Email:</label></div> 
               <div><input className="newEmail" name="newEmail" placeholder="ShopGirl@aol.com is already taken" required></input></div> 
                <div>
                    <button type="submit">update!</button>
                   <button onClick={(event)=>{setShowUpdateEmail(false);}}>nevermind!</button>
                </div>
            </form>
         

        </div>
    )


}

export default UpdateEmail;