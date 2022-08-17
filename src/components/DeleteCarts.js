import React, { useState } from "react";
 FrontEndCartBranch
import { createNewCart, getEachCartByUser, hideCart } from "../api";

import { storeUserData, grabUser } from "../auth";

const DeleteCarts = () => {


const handleOnClick = async (event) => {
    event.preventDefault();
    let userData = localStorage.getItem("userData");
    let data = grabUser(userData);
    let userId = data.id;
    const canCreate = await getEachCartByUser(userId);
 FrontEndCartBranch
    console.log(canCreate)
    if (canCreate.length){canCreate.map(async(cart)=>{
     const id  = cart.id
         console.log(id,'this is cartId')
        const response = await hideCart(id)
        console.log(response, 'this is your response')
        return response
    })}
  

}



    return(

        <>
        <button onClick={handleOnClick}>Delete carts</button>
        </>

    )




}




export default DeleteCarts;