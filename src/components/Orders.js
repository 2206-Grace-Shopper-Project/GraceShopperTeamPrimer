import React, { useState, useEffect } from "react";
// import { getUserOrders } from "../api";
// import { grabUser } from "../auth";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function createNewOrder(cartId, address, email, quantity, date, price){
    try {
        const response = await fetch(`${BASE}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartId, 
                address, 
                email, 
                quantity, 
                date, 
                price
            }),
        })
        const result = await response.json()
        console.log(result, 'result from createNewOrder')
        return result
    } catch (error) {
        throw error
    }
}


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

    const addNewOrder = async() => {
        console.log('here')
        let cartId = response.id 
        let email = data.email
        await createNewOrder(cartId, address, email, quantity, date, price)
    }

    return(
        <div>
            <button onClick={addNewOrder}>add new order</button>
            <h1>Order History</h1>
            {orders.map((order, index) => {
                 let orderDate = Number(order.date)
                 let dateObj = new Date(orderDate)
                 let finalDateFormat = dateObj.toLocaleString()     
                return (
                <div key={index}>
                    <p>Order Date: {finalDateFormat}</p>
                    <p>Quantity:{order.quantity}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To:{order.address}</p>
                </div>
                )
            })}
        </div>
    )
}



export default Orders

