import React, { useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({userDataObj, CMI}) => {
    const [movies, setMovies] = useState([])
    const userId = userDataObj.id
    let id = CMI


    async function handleOnClick (event) {
        event.preventDefault();
        const userCart = await getEachCartByUser(userId) 
        const response = await removeMovieFromACart(id)
        setMovies(userCart)
    console.log(response,'this is movies') 
    }


    return(
        <>
        <button onClick={handleOnClick}>Remove Movie</button>
        </>
    )
}


export default RemoveMovie