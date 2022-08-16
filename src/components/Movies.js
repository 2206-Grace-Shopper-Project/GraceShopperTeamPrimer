import React from "react";
export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getUserOrders(userId) {
    try {
        const response = await fetch(`${BASE}/orders/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        console.log(token, 'token')
        const result = await response.json()
        return result
    } catch (error) {
        
    }

}

const Movies = () =>{
    return(
        <h1>Hello</h1>
    )
}



export default Movies