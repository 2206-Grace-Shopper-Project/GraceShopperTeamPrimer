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
    const cartId = currentCart.id;
    const movieId = id;
    const quantity = purchaseAmount;
    const response = await addMovieToCart(cartId, movieId, quantity);
    console.log(response, "this is response from adding movie to cart");
  };

  return (
    <>
      <button
        className="addToCart priceText textContainer topRowContainer movieContainer"
        onClick={handleOnClick}
      >
        Add to Cart
      </button>
    </>
  );
};

export default CartMovies;
