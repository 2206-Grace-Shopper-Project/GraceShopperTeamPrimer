import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAllOrders } from "../api";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getCartById(id) {
    // console.log(id, 'id in get cartsbyid')
    try {
        const response = await fetch (`${BASE}/carts/cartid/${id}`, {
            headers: {
                "Content-Type": "application/json"
              }
        })
        const result = await response.json()
        // console.log(result, 'result from getCartById')
        return result
    } catch (error) {
        throw error
    }
}


const AllOrders = ({userDataObj}) =>{
    const [orders, setOrders] = useState([])
    const [orderCarts, setOrderCarts] = useState([])

    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders()
        setOrders(ordersList)
    }

    const getMoviesOnOrders = async() => {
        let cartIds = orders.map((order)=>{
            return order.cartId
        })
        let order = []
        for await(const id of cartIds){
            const response = await getCartById(id)
            order.push(response[0])
        }
        setOrderCarts(order)
    }

    console.log(orderCarts, 'hehe')

    useEffect(() => {
        getAllUserOrders();
    }, [])
    
    useEffect(() => {
        getMoviesOnOrders()
    }, [orders])

    return (
        <div> 
        {userDataObj.id === 5 || userDataObj.id === 8 || userDataObj.id === 9 || userDataObj.id === 11 ? 
        <div>
        <h1 className='all-orders-title'>All Orders</h1>
        {orders.map((order, index) => {
            let orderDate = Number(order.date)
            let dateObj = new Date(orderDate)
            let finalDateFormat = dateObj.toLocaleString()

            return (
                <div key={index} id="all-orders">
                    {orderCarts.length ? orderCarts.map((cart)=>{
                        return (
                            <div>
                        {(cart.id === order.cartId) ? 
                                (cart.movies.map((movie, idx)=>{
                                    return (
                                        <div className ='ordermovietitle' key={idx}>
                                            <span><img src={movie.poster} id='movie-poster'></img></span>
                                            <p>{movie.title} (Qty: {movie.quantity})</p>
                                        </div>
                                    )
                                }))
                            : null } </div>)
                    }) : <></>}
                    <p>Customer Name: {order.name}</p>
                    <p>Date Purchased: {finalDateFormat}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To: {order.address}</p>
                    <p>Email: {order.email}</p>
                </div>
            )
        })} </div>
        : <h1>nice try buddy</h1> }
        
    </div>
    )
}

export default AllOrders