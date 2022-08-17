import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { getAllOrders } from "../api";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function getAllUsers(){
    try {
        const response = await fetch(`${BASE}/users`, {
            headers: {
                "Content-Type": "application/json"
              },
        })
        const result = await response.json()
        console.log(result, 'result from getAllUsers')
        return result
    } catch(error){
        throw error
    }
}

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


const Admin = () =>{
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    const getUsers = async() => {
        const usersList = await getAllUsers()
        setUsers(usersList)
    }
    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders()
        setOrders(ordersList)
    }
    console.log(orders)
    useEffect(() => {
        getAllUserOrders();
        getUsers();
    }, [])


    return(
        <div>
            <NavLink to='all-orders'>Orders</NavLink>
            <NavLink to='all-users'>Users</NavLink>
            <div id="all-orders">
                <h1>All Orders</h1>
                {orders.map((order, index) => {
                    console.log(order.date, 'hello')
                    let orderDate = (order.date)
                    let dateObj = new Date(order.date)
                    console.log(dateObj)
                    let date = dateObj.getDate();
                    let month = dateObj.getMonth() + 1;
                    let year = dateObj.getFullYear();
                    let hours = dateObj.getHours();
                    let minutes = dateObj.getMinutes();
                
                    let newDateString = `${month<10?`0${month}`:`${month}`}-${date}-${year} ${hours + ':' + minutes}`
                    return (
                        <div key={index}>
                            <p>Name: {order.name}</p>
                            {/* <p>Date Purchased: {order.date}</p> */}
                            <p>Date Purchased: {newDateString}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Price: ${order.price}</p>
                            <p>Sent To: {order.address}</p>
                            <p>Email: {order.email}</p>
                        </div>
                    )
                })}
            </div>
            
            <div id="all-users">
                <h1>All Users</h1>
                {users.map((user, index)=> {
                    return (
                        <div key={index}>
                            <p>Id: {user.id}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Admin
