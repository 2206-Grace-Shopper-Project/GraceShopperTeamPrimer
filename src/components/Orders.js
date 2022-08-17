import React, { useState, useEffect } from "react";
import { getUserOrders } from "../api";
import { grabUser } from "../auth";

const Orders = ( {token} ) =>{
    const [orders, setOrder] = useState([])
    let userData = localStorage.getItem("userData");

    const getUserOrderInfo = async () => {
        let user = grabUser(userData)
        let userId = user.id 
            console.log(userId,"userId in getuserorderinfo")
        const userOrders = await getUserOrders(userId, token)
        setOrder(userOrders)
    }
    useEffect(() => {
        getUserOrderInfo()
    }, [])

    return(
        <div>
            <h1>Order History</h1>
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

