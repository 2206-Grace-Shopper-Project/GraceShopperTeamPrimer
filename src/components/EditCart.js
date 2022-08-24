import React from "react";
import { getEachCartByUser, updateMovieQuantity } from "../api";

const EditCart = ({
  userDataObj,
  CMI,
  movieId,
  setCanEdit,
  myCart,
  setMyCart,
  guestUserObj,
}) => {
  let id = CMI;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (guestUserObj && myCart) {
      let userId = guestUserObj.id;
      let quantity = event.target.quantity.value;
      const cart = await getEachCartByUser(userId);
      const newQ = await updateMovieQuantity(id, quantity);
      let cartId = newQ.cartId;
      let movieId = newQ.movieId;
      quantity = newQ.quantity;

      let newMovies = [...myCart.movies];
      newMovies.map((element) => {
        if (
          movieId === element.id &&
          cartId === element.cartId &&
          CMI === element.cartMoviesId
        ) {
          element.quantity = quantity;
        }
        let finalMovies = [...newMovies];
        cart.movies = finalMovies;
      });

      setMyCart(cart);
      setCanEdit(false);
    } else if (myCart) {
      let userId = userDataObj.id;
      let quantity = event.target.quantity.value;
      const cart = await getEachCartByUser(userId);
      const newQ = await updateMovieQuantity(id, quantity);
      let cartId = newQ.cartId;
      let movieId = newQ.movieId;
      quantity = newQ.quantity;

      let newMovies = [...myCart.movies];
      newMovies.map((element) => {
        if (
          movieId === element.id &&
          cartId === element.cartId &&
          CMI === element.cartMoviesId
        ) {
          element.quantity = quantity;
        }
        let finalMovies = [...newMovies];
        cart.movies = finalMovies;
      });

      setMyCart(cart);
      setCanEdit(false);
    }
  };

  return (
    <div id="edit-cart">
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Qty:</label>
        <input type="number" required name="quantity" min="1" />
        <button type="submit">Update Qty</button>
      </form>
      <button
        className="cancelButton"
        onClick={() => {
          setCanEdit(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditCart;
