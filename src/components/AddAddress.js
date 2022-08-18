import React from "react";

// for the API index
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

async function NewAddress(token, userId, address) {
    console.log(token, "Lorraine Bracco")
    try {
        const response = await fetch (`${BASE}/users/address/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                address
            })
        });
        const result = await response.json();
        console.log(result, "and wendell pierce as agent richard gill")
        return result;
    } catch (error) {
        console.error
    }
}


// END OF "for the API index"

const AddAddress =({token, userDataObj, setShowAddAddress})=>{
    

    const handleSubmit = async (event) => {
        console.log(token, "Angelina Jolie")
        event.preventDefault();
        const userId = userDataObj.id
        const address = event.target.address.value;

        await NewAddress(token, userId, address);
        setShowAddAddress(false)
    }

    return (
        <div>
 
            <div>Add Address Below</div>
            <form onSubmit={handleSubmit}>
                <label>Address?</label>
                <input name="address" placeholder="what's the address?"></input>
                <button type="submit">Add Address!</button>
            </form>
        </div>
    )


}

export default AddAddress;