import React from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({userDataObj}) => {
const userId = userDataObj.id
console.log(userDataObj,'UDO')
console.log(userId)


    async function handleOnClick (event) {
        event.preventDefault();
        const userCart = await getEachCartByUser(userId) 
        console.log(userCart)

    }


    return(
        <>
        <button onClick={handleOnClick}>Remove Movie</button>
        </>
    )
}


export default RemoveMovie