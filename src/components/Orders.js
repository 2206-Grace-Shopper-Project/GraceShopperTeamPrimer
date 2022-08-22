import React, { useState, useEffect } from "react";
import { getUserOrders, } from "../api";

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
        console.log(orders, 'line 39')
        let cartIds = orders.map((order)=>{
            return order.cartId
        })
        // console.log(cartIds, 'cartIds')
        let order = []
        // cartIds.forEach(async(id)=>{
        //     const response = await getCartById(id)
        //     // console.log(response, 'response')
        //     order.push(response[0])
        // })
        for await(const id of cartIds){
            const response = await getCartById(id)
            // console.log(response, 'response')
            order.push(response[0])
        }
        console.log(order, 'order')
        console.log(cartIds, 'cartIds')
        setOrderCarts(order)
    }
 
    // console.log(orderCarts, 'orderCarts')


    useEffect(() => {
        getUserOrderInfo()
    }, [])

    useEffect(()=>{
        getCartsInOrders()
    },[orders])
    

    return(
        <div>
        {(orders.length) ? 
        (<div className='order-history'>

            <h1>Order History</h1>

            <div>
            {orders.map((order, index) => {
                // console.log(order, 'order')
                let orderDate = Number(order.date)
                let dateObj = new Date(orderDate)
                let finalDateFormat = dateObj.toLocaleString()

                return (
                <div id='orders' key={index}>
                    {orderCarts.length ? orderCarts.map((cart)=>{
                        // console.log(cart, 'CART')
                        // console.log(order, 'ORDER')
                        // console.log(cart.id, 'CARTID')
                        // console.log(order.cartId, 'ORDERCARTID')
                        return (
                            <div>
                        {(cart.id === order.cartId) ? 
                                (cart.movies.map((movie, idx)=>{
                                    // console.log(movie.title, 'MOVIE TITLE')
                                    return (
                                        <div key={idx}>
                                            <p>{movie.title}</p>
                                            {/* <p>Order Date: {finalDateFormat}</p>
                                            <p>Price: ${order.price}</p>
                                            <p>Sent To:{order.address}</p> */}
                                        </div>
                                    )
                                }))
                            : null } </div>)
                    }) : <></>}
                    {/* <p>Purchased: {movie.title}</p> */}
                    <p>Order Date: {finalDateFormat}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To:{order.address}</p>
                </div>
                )
            })}
            </div>
            <div>
            {/* {orderCarts.map((order, index)=>{
                console.log(order.movies, 'title')
                return (
                    <div key ={index}>
                    {order.movies.map((movie, idx)=>{
                        console.log(movie, 'MOVIE!!!!')
                        return (
                            <div key={idx}>
                                <p>Purchased: {movie.title}</p>
                                <p>hello</p>
                            </div>
                        )
                    })}
                    </div>)
            })} */}
            </div>
        </div>) 
        : <p>order list blank</p>}
        </div>
    )
}



export default Orders

