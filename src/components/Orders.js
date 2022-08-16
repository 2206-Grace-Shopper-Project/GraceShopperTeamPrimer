import React, { useEffect } from "react";
import { getUserOrders } from "../api";


const Orders = () =>{
    const [orders, setOrder] = useState([])

    const getUserOrderInfo = async () => {
        const user = await getUser(id, token)
            console.log(user, 'user in getUserOrderInfo')
        const userOrders = await getUserOrders(userId, token)
            console.log(userOrders, 'userOrders')
        setOrder(userOrders)
    }
    useEffect(() => {
        getUserOrderInfo()
    }, [])

    return(
        <div>
            <h1>Orders</h1>
            {orders.map((order, index) => {
                <div key={index}>
                    <p>{new Date(order.date)}</p>
                    <p>{order.quantity}</p>
                    <p>{order.price}</p>
                    <p>{order.address}</p>
                </div>
            })}
        </div>
    )
}



export default Orders

