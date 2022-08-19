import React, { useEffect, useState } from "react";
import { createNewCart, getEachCartByUser, hideCart } from "../api";
// import { storeUserData, grabUser } from "../auth";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function createNewOrder(cartId, address, email, quantity, date, price){
    console.log( cartId, address, email, quantity, date, price )

    try {
        const response = await fetch(`${BASE}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartId, 
                address, 
                email, 
                quantity, 
                date, 
                price
            }),
        })
        const result = await response.json()
        console.log(result, 'result from createNewOrder')
        return result
    } catch (error) {
        throw error
    }
}

export async function getMyAddresses(id){
    try {
        const response = await fetch(`${BASE}/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error
    }
  }

const PurchaseItems = ({setUserCart, userDataObj}) => {
    const [cartsInfo, setCartsInfo] = useState([])
    const [addressOnOrder, setAddressOnOrder] = useState([])
    const [confirmForm, setConfirmForm] = useState(false)

    const getCartInfo = async () => {
        let userId = userDataObj.id;
        let id = userDataObj.id
        let addressInfo = await getMyAddresses(id)
        setAddressOnOrder(addressInfo)
        const cartData = await getEachCartByUser(userId);
        setCartsInfo(cartData)
    }

    const handleOnClick = async (event) => {
        event.preventDefault();
        const id = cartsInfo[0].id
        const response = await hideCart(id)

        {cartsInfo.map((cart, index)=>{
            return (
                <div key={index}>
                {cart.movies ? (
                cart.movies.map(async (movie) => {
                    let quantity = movie.quantity            
                    let price = movie.price
                    let cartId = response.id
                    let email  = userDataObj.email
                    let date = new Date().getTime()
                    let addressArr = addressOnOrder.address.map((address)=>{
                        return address.address
                    })
                    let address = addressArr.toString()
                    console.log( cartId, address, email, quantity, date, price )
                    await createNewOrder(cartId, address, email, quantity, date, price)
                })
                ) : null }
                </div>
            )
        })}
        setUserCart(null)
    }

    useEffect(()=>{
        getCartInfo()
    }, [])

    return(
        <div>
        {/* <button onClick={handleOnClick}>Purchase</button> */}
        <div>
            {/* <h1>Confirm Purchase</h1> */}
            <button onClick={()=>{
                setConfirmForm(true)
            }}>Purchase</button>
            {confirmForm ? (cartsInfo.map((cart, index)=>{
                return (
                    <div key={index}>
                    {cart.movies.map(async (movie) => {
                        let quantity = movie.quantity            
                        let price = movie.price
                        let cartId = response.id
                        let email  = userDataObj.email
                        let date = new Date().getTime()
                        let addressArr = addressOnOrder.address.map((address)=>{
                            return address.address
                        })
                        let address = addressArr.toString()
                        console.log( cartId, address, email, quantity, date, price )
                        await createNewOrder(cartId, address, email, quantity, date, price)
                    })}
                    </div>
                )
            })) : null}
        </div>
        </div>

    )
}

export default PurchaseItems;