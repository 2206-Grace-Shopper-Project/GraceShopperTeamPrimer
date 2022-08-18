import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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

const AllUsers = () =>{
    const [users, setUsers] = useState([])
    let navigate = useNavigate();


    const getUsers = async() => {
        const usersList = await getAllUsers()
        setUsers(usersList)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
        <button
        onClick={() => {
            navigate("/admin");
          }}
        >back to admin page</button>
    <div className="all-users">
        <h1>All Users</h1>
        {users.map((user, index)=> {
            return (
                <div key={index} id='all-users'>
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

export default AllUsers