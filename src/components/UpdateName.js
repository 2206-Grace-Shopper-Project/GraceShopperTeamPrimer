import React, {useState} from 'react';
import "./extra.css"

// goes into API INDEX
// export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export const BASE = `http://localhost:4000/api`;

export async function updateName(userId, name){
    const token = localStorage.getItem("token")
    console.log(name, userId, "line 10 from UpdateName")
    try {
        const response = await fetch(`${BASE}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name
            }),
        });
        const result = await response.json();
        return result;  
    } catch (error) {
        console.error;
    }
}
// END OF (goes into API INDEX)



const UpdateName = ({setShowUpdateName, userDataObj,}) => {
    console.log(userDataObj)

const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id
    const name = event.target.newName.value
    const email = userDataObj.email
    
    console.log(await updateName(userId, name), "HERE IS THAT UPDATED INFO");
    setShowUpdateName(false)
 
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