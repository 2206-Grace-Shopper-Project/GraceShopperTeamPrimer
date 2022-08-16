import React from "react";
import { createNewCart } from "../api";

const Carts = (userId) =>{


    //onClick for create a new cart 
const handleOnClick = async (event) => {
    event.preventDefault();
    const response = await createNewCart(userId)
    return console.log(response, "this is the respnse from the Cart component")

}



    return(
        <>
        <button onClick={handleOnClick}>Create Cart</button>
        <>
        {/* <button onClick={async (event)=>{
            event.preventDefault();
            const 
        }}></button> */}
        </>
        </>
    )
}



export default Carts