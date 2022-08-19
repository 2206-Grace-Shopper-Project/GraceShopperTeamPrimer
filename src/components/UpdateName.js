import React, {useState} from 'react';


// goes into API INDEX
export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function updateUserInfo(userId, name, email, password){
    try {
        const response = await fetch(`${BASE}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        });
        const result = await response.json();
        return result;  
    } catch (error) {
        console.error;
    }
}
// END OF (goes into API INDEX)



const UpdateName = ({setShowUpdateName, userDataObj}) => {
    console.log(userDataObj)

const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id
    const name = event.target.newName.value
    const email = userDataObj.email

    updateUserInfo(userId, name, email);
    setIsShown(false)
 
  };

    return(
        <div>
            <div>TheUpdateAddressPage</div>
            <form onSubmit={handleSubmit}>
                <label>New Name: </label>
                <input name="newName" placeholder="There is no Dana, only ZUUL"></input>
                <button type="submit">update!</button>
            </form>
            <button onClick={(event)=>{setShowUpdateName(false);}}>nevermind!</button>

        </div>
    )


}

export default UpdateName;