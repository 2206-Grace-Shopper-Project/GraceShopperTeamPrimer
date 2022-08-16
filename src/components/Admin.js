import React, { useState, useEffect } from "react";


const Admin = () =>{
    const [orders, setOrders] = useState([])

    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders(token)
        setOrders(ordersList)
    }
    useEffect(() => {
        getAllUserOrders()
    }, [])


    return(
        <div>
            <div id="all-orders">
                {orders.map((order, index) => {
                    <div key={index}>
                        <p>{order}</p>
                    </div>
                })}
            </div>
            <div id="all-users">

            </div>
        </div>
    )
}



export default Admin

// admin function 
export async function getAllOrders(token) {
    try {
        const response = await fetch(`${BASE}/orders`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        const result = await response.json()
            console.log(result, 'result from getAllOrders')
    } catch (error) {
        throw error
    }
}