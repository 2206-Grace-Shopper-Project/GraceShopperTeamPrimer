import React from "react";
import { addMovieToCart, removeMovieFromACart, updateMovieQuantity, getCartMoviesById } from "../api";

const CartMovies = () => {


    const handleOnClick = async (event) => {
        event.preventDefault();


    }
    
      



    return(
     <>
     <button onClick={handleOnClick}>Add Movie to cart</button>
    </>
    )
}




export default CartMovies;