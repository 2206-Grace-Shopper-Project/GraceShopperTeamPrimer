import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api";

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