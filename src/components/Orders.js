import React, { useState, useEffect } from "react";
import { getUserOrders } from "../api";
// import { grabUser } from "../auth";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function getCartWithMovieById(id){
    console.log(id)
    try {
        const response = await fetch (`${BASE}/cart_movies/${id}`, {
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

        let idArr = orders.map((order) => {
            return order.cartId
        })

        let id = Number(idArr.toString())
        const cart = await getCartWithMovieById(id)

        console.log(cart, 'cart in orders')
        setOrderCarts(cart)
        // console.log(orderCarts)
    }
    console.log(orderCarts, 'orderCarts')
    console.log(orders, 'orders')

    useEffect(() => {
        getUserOrderInfo()
    }, [])
    
    return(
        <div>
            <h1>Order History</h1>
            {orders.map((order, index) => {
                let orderDate = Number(order.date)
                let dateObj = new Date(orderDate)
                let finalDateFormat = dateObj.toLocaleString()
               
                console.log(order, 'inside orders.map')
            
                return (
                <div key={index}>
                    {orderCarts.map((element)  => {
                        console.log(element, "line 64")
                        // return (
                        // <div key={idx}>
                        //     <p>Movies Purchased:{item.movieId}</p>
                        // </div>
                        // )
                    })}
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

