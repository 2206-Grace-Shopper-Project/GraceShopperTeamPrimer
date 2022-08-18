import React from "react";
import { addMovieToCart, removeMovieFromACart, updateMovieQuantity, getCartMoviesById, getEachCartByUser} from "../api";

const CartMovies = ({userDataObj}) => {
const userId = userDataObj.id

    const handleOnClick = async (event) => {
        event.preventDefault();
        const currentCart = await getEachCartByUser(userId) 
        const cartId = currentCart[0].id
        
    }
    
      



    return(
     <>
     <button onClick={handleOnClick}>Add Movie to cart</button>
    </>
    )
}




export default CartMovies;