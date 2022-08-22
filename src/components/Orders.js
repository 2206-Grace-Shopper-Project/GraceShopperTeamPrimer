import React, { useState, useEffect } from "react";
import { getUserOrders, } from "../api";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getCartById(id) {
    console.log(id, 'id in get cartsbyid')
    try {
        const response = await fetch (`${BASE}/carts/cartid/${id}`, {
            headers: {
                "Content-Type": "application/json"
              }
        })
        const result = await response.json()
        console.log(result, 'result from getCartById')
        return result
    } catch (error) {
        throw error
    }
}



const Orders = ({userDataObj}) =>{
    const [orders, setOrder] = useState([])
    const [orderCarts, setOrderCarts] = useState([])

    const getUserOrderInfo = async () => {
        let user = userDataObj
        let userId = user.id 
            console.log(userId,"userId in getuserorderinfo")
        const userOrders = await getUserOrders(userId)
        setOrder(userOrders)
    }
    // console.log(orders, 'orders')

    const getCartsInOrders = async () => {
        let cartIds = orders.map((order)=>{
            return order.cartId
        })
        // console.log(cartIds, 'cartIds')
        for (let i = 0; i < cartIds.length; i++){
            // console.log(cartIds[i])
            let id = cartIds[i]
            console.log(id, 'id')
            let result = await getCartById(id)
            console.log(result, 'result')
        }
    }

    useEffect(() => {
        getUserOrderInfo()
        getCartsInOrders()
    }, [])
    
    return(
        <div className='order-history'>
            <h1>Order History</h1>
            {orders.map((order, index) => {
                // console.log(order, 'ORDER')
                // console.log(order.cartId, 'cartId in orders map')
                let orderDate = Number(order.date)
                let dateObj = new Date(orderDate)
                let finalDateFormat = dateObj.toLocaleString()
            
                return (
                <div id='orders' key={index}>
                    <p>Order Date: {finalDateFormat}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To:{order.address}</p>
                </div>
                )
            })}
        </div>
    )
}



export default Orders

