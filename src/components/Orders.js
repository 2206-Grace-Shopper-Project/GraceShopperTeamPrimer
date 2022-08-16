import React, { useEffect } from "react";
import { getUserOrders } from "../api";


const Orders = () =>{
    const [orders, setOrder] = useState([])

    const getUserOrderInfo = async () => {
        const user = await getUser(id, token)
            console.log(user, 'user in getUserOrderInfo')
        const userOrders = await getUserOrders(userId, token)
            console.log(userOrders, 'userOrders')
        setOrder(userOrders)
    }
    useEffect(() => {
        getUserOrderInfo()
    }, [])

    return(
        <div>
            <h1>Orders</h1>
            {orders.map((order, index) => {
                <div key={index}>
                    <p>{new Date(order.date)}</p>
                    <p>{order.quantity}</p>
                    <p>{order.price}</p>
                    <p>{order.address}</p>
                </div>
            })}
        </div>
    )
}



export default Orders



export async function getUserOrders(userId, token) {
    try {
        const response = await fetch(`${BASE}/orders/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        const result = await response.json()
            console.log(result, 'result from getUserOrders')
        return result
    } catch (error) {
        throw error
    }
}


export const getUser = async(id, token) => {
    const response = await fetch(`${BASE}/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
    })
    const result = await response.json()
        console.log(result, 'result from getUser')
    return result
}