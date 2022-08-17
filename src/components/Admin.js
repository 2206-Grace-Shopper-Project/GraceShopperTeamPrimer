import React, { useState, useEffect } from "react";
import { getAllOrders } from "../api";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function getAllUsers(token){
    try {
        const response = await fetch(`${BASE}/users`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
        })
        const result = response.json()
        console.log(result, 'result from getAllUsers')
        return result
    } catch(error){
        throw error
    }
}


const Admin = ({token}) =>{
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    const getUsers = async() => {
        const usersList = await getAllUsers()
        setUsers(usersList)
    }

    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders(token)
        setOrders(ordersList)
    }
    useEffect(() => {
        getAllUserOrders();
        getUsers();
    }, [])


    return(
        <div>
            <div id="all-orders">
                <h1>All Orders</h1>
                {/* {orders.map((order, index) => {
                    <div key={index}>
                        <p>{order}</p>
                    </div>
                })} */}
            </div>
            <div id="all-users">
                <h1>All Users</h1>
                {/* {users.map((user, index)=> {
                    <div key={index}>
                        <p>{user}</p>
                    </div>
                })} */}
            </div>
        </div>
    )
}


export default Admin
