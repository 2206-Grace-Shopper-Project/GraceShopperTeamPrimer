import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

export async function getAllOrders() {
    try {
      const response = await fetch(`${BASE}/orders`, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      const result = await response.json();
      console.log(result, "result from getAllOrders");
      return result
    } catch (error) {
      throw error;
    }
}

export async function getCartById(id) {
    console.log(id, 'hello')
    try {
        const response = await fetch (`${BASE}/carts/${id}`, {
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



const AllOrders = () =>{
    const [orders, setOrders] = useState([])
    const [orderCarts, setOrderCarts] = useState([])
    let navigate = useNavigate();

    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders()
        setOrders(ordersList)
        // {orders.map(async(order) => {
        //     let id = order.cartId
        //     const carts = await getCartById(id)
        //     setOrderCarts(carts)
        // })}
    }

    useEffect(() => {
        getAllUserOrders();
    }, [])

    return (
        <div>
            <button
            onClick={() => {
                navigate("/admin");
              }}
            >back to admin page</button>
        <div>

        <h1>All Orders</h1>
        {orders.map((order, index) => {
            console.log(orders, 'orders')
            let orderDate = Number(order.date)
            let dateObj = new Date(orderDate)
            let finalDateFormat = dateObj.toLocaleString()

            return (
                <div key={index} id="all-orders">
                    
                    {/* {orderCarts.map((cart, idx)  => {
                        console.log(cart.isPurchased, "line 77")
                        return (
                            <div key={idx}>
                                <p>Movies Purchased:{cart.movies}</p>
                            </div>
                        )
                    })} */}
                    <p>Customer Name: {order.name}</p>
                    <p>Date Purchased: {finalDateFormat}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Price: ${order.price}</p>
                    <p>Sent To: {order.address}</p>
                    <p>Email: {order.email}</p>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default AllOrders