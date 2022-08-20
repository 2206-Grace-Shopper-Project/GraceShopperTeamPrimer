import React, { useState } from "react";
import {
  addMovieToCart,
  removeMovieFromACart,
  updateMovieQuantity,
  getCartMoviesById,
  getEachCartByUser,
} from "../api";

const CartMovies = ({ userDataObj, purchaseAmount, id, realPrice, title }) => {
  


  let userId = null

  if(userDataObj){
    userId= userDataObj.id
  }


  const handleOnClick = async (event) => {
    event.preventDefault();
    const currentCart = await getEachCartByUser(userId);
   
    if (purchaseAmount === 0) {
      let quantity = 1 
      const cartId = currentCart.id;
      const movieId = id;
      const response = await addMovieToCart(cartId, movieId, quantity);
      console.log(response, "this is response from adding movie to cart");
    } else {
      let quantity = purchaseAmount;
      const cartId = currentCart.id;
      const movieId = id;
      const response = await addMovieToCart(cartId, movieId, quantity);
      console.log(response, "this is response from adding movie to cart");
    }
  };

  return (
    <>
      <button
        className="addToCart priceText textContainer topRowContainer movieContainer"
        onClick={handleOnClick}
      >
        <span class="material-symbols-outlined" id='add-cart-icon'>add_shopping_cart</span>
      </button>
    </>
  );
};

export default CartMovies;
