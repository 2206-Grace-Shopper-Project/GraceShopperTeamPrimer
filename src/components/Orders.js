import React, { useState, useEffect } from "react";
// import { getUserOrders } from "../api";
// import { grabUser } from "../auth";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function getUserOrders(userId) {
  try {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response)
    const result = await response.json()
    console.log(result, "result from getUserOrders line 15");
    return result;
  } catch (error) {
    throw error;
  }
}

const Orders = ({userDataObj}) =>{
    const [orders, setOrder] = useState([])

    const getUserOrderInfo = async () => {
        let user = userDataObj
        let userId = user.id 
            console.log(userId,"userId in getuserorderinfo")
        const userOrders = await getUserOrders(userId)
        setOrder(userOrders)
    }
    console.log(orders, 'orders')
    useEffect(() => {
        getUserOrderInfo()
    }, [])

    return(
        <div>
            <h1>Order History</h1>
            {orders.map((order, index) => {
                <div key={index}>
                    {/* <p>{new Date(order.date)}</p> */}
                    <p>{order.date}</p>
                    <p>{order.quantity}</p>
                    <p>{order.price}</p>
                    <p>{order.address}</p>
                </div>
            })}
        </div>
    )
}



export default Orders

