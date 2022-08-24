import React, { useEffect, useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({ userDataObj, CMI, myCart, setMyCart, guestUserObj }) => {
  const [movies, setMovies] = useState([]);

  let id = CMI;

  async function handleClick(event) {
    if (guestUserObj && myCart) {
      let userId = guestUserObj.id;
      const ourCart = await getEachCartByUser(userId);
      await removeMovieFromACart(id);
      let deletedMovie = [...myCart.movies];
      deletedMovie.forEach((element, index) => {
        if (element.cartMoviesId === id) {
          deletedMovie.splice(index, 1);
          ourCart.movies = deletedMovie;
        }

        setMyCart(ourCart);
      });
    } else if (myCart) {
      let userId = userDataObj.id;
      const ourCart = await getEachCartByUser(userId);
      await removeMovieFromACart(id);

      let deletedMovie = [...myCart.movies];
      deletedMovie.forEach((element, index) => {
        if (element.cartMoviesId === id) {
          deletedMovie.splice(index, 1);
          ourCart.movies = deletedMovie;
        }
        setMyCart(ourCart);
      });
    }
  }

  return (
    <>
      <button onClick={handleClick}>Remove Movie</button>
    </>
  );
};

export default RemoveMovie;
