import React, { useState, useEffect } from "react";
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

// export async function getAllOrders() {
//     try {
//       const response = await fetch(`${BASE}/orders`, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//       });
//       const result = await response.json();
//       console.log(result, "result from getAllOrders");
//     } catch (error) {
//       throw error;
//     }
//   }


const Admin = ({token}) =>{
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    const getUsers = async() => {
        const usersList = await getAllUsers()
        setUsers(usersList)
    }
    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders()
        console.log(ordersList, 'here')
        setOrders(ordersList)
    }
    console.log(orders)
    useEffect(() => {
        getAllUserOrders();
        getUsers();
    }, [])


    return(
        <div>
            <div id="all-orders">
                <h1>All Orders</h1>
                {/* {orders.map((order, index) => {
                    console.log(order,'line 47')
                    return (
                        <div key={index}>
                            <p>{order}</p>
                        </div>
                    )
                })} */}
            </div>
            <div id="all-users">
                <h1>All Users</h1>
                {users.map((user, index)=> {
                    return (
                        <div key={index}>
                            <p>{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Admin
