import React, { useState } from "react";

import { createNewCart, getEachCartByUser, hideCart } from "../api";

import { storeUserData, grabUser } from "../auth";

const DeleteCarts = () => {


const handleOnClick = async (event) => {
    event.preventDefault();
    let userData = localStorage.getItem("userData");
    let data = grabUser(userData);
    let userId = data.id;
    const canCreate = await getEachCartByUser(userId);
    const id = canCreate[0].id
    const response = await hideCart(id) 

console.log(response, ' response from delete')

}



    return(

        <>
        <button onClick={handleOnClick}>Delete carts</button>
        </>

    )




}




export default DeleteCarts;