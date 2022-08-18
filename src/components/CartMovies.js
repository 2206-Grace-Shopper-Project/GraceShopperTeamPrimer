import React from "react";
import {
  addMovieToCart,
  removeMovieFromACart,
  updateMovieQuantity,
  getCartMoviesById,
  getEachCartByUser,
} from "../api";

const CartMovies = ({ userDataObj, purchaseAmount, id, realPrice, title }) => {
  const userId = userDataObj.id;

  const handleOnClick = async (event) => {
    event.preventDefault();
    const currentCart = await getEachCartByUser(userId);
    const cartId = currentCart[0].id;
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
