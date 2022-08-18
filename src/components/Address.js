import React from "react";

// for the API index
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`

async function AddAddress(token, userId, address)) {
    try {
        const response = await fetch (`${BASE}/users/address/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error
    }
}


// END OF "for the API index"

const Address =({token, useruserDataObj})=>{
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = userDataObj.id
        const address = event.target.address.value;

        await AddAddress(token, userId, address);
    }

    return (
        <div>
            <div>Address Page</div>
            <div>Add Address Below</div>
            <form onSubmit={handleSubmit}>
                <label>Address?</label>
                <input name="address" placeholder="what's the address?"></input>
                <button type="submit">Add Address!</button>
            </form>
        </div>
    )


}

export default Address;