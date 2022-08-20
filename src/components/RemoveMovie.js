import React, { useEffect, useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({ userDataObj, CMI, myCart, setMyCart }) => {
  const [movies, setMovies] = useState([]);
  const userId = userDataObj.id;
  let id = CMI;

  async function handleClick(event) {
    console.log(myCart, "this is MYCART!!!!");
    if (myCart) {
      const ourCart = await getEachCartByUser(userId);
      await removeMovieFromACart(id);

      let deletedMovie = [...myCart.movies];
      deletedMovie.forEach((element, index) => {
        if (element.cartMoviesId === id) {
          console.log(element.cartMoviesId, "CartMovieId");
          deletedMovie.splice(index, 1);
          console.log(deletedMovie, "what is this");
          ourCart.movies = deletedMovie;

          //  myCart.movies = newMovie
        }
        setMyCart(ourCart);
        console.log(myCart, "is this the new movies arrays");
      });
    }
  }

  useEffect(() => {}, [movies]);

  return (
    <>
      <button onClick={handleClick}>Remove Movie</button>
    </>
  );
};

export default RemoveMovie;
