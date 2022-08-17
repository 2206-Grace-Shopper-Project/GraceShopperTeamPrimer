import React, { useState, useEffect } from "react";


const Admin = () =>{
    const [orders, setOrders] = useState([])

    const getAllUserOrders = async() => {
        const ordersList = await getAllOrders(token)
        setOrders(ordersList)
    }
    useEffect(() => {
        getAllUserOrders()
    }, [])


    return(
        <div>
            <div id="all-orders">
                {orders.map((order, index) => {
                    <div key={index}>
                        <p>{order}</p>
                    </div>
                })}
            </div>
            <div id="all-users">

            </div>
        </div>
    )
}



export default Admin