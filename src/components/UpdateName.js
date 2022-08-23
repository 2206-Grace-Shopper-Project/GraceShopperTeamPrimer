import React, {useState} from 'react';
import "./extra.css"

// goes into API INDEX
export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;


export async function updateName(userId, updateObj){
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



const UpdateName = ({setShowUpdateName, userDataObj,setUserDataObj}) => {

const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id
    const name = event.target.newName.value
    const email = userDataObj.email
    const updateObj = {}
    updateObj.name = name
    updateObj.email = email
    updateObj.id = userId
    
    await updateName(userId, updateObj), 
    setShowUpdateName(false)
    setUserDataObj(updateObj)
  };

    return(
        <div>
            
            <form onSubmit={handleSubmit}>
               <div><label>New Name: </label></div> 
               <div><input className="newName" name="newName" placeholder="There is no Dana, only ZUUL"></input></div> 
                <div>
                    <button type="submit">update!</button>
                   <button onClick={(event)=>{setShowUpdateName(false);}}>nevermind!</button>
                </div>
            </form>
         

        </div>
    )


}

export default UpdateName;