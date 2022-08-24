import React, { useEffect, useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({ userDataObj, CMI, myCart, setMyCart, guestUserObj }) => {
  const [movies, setMovies] = useState([]);
  
  let id = CMI;

  async function handleClick(event) {
    console.log(myCart, "this is MYCART!!!!");
    if(guestUserObj && myCart){
      let userId = guestUserObj.id
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




    }else
    if (myCart) {
      let userId = userDataObj.id;
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


  return (
    <>
      <button onClick={handleClick}>Remove Movie</button>
    </>
  );
};

export default RemoveMovie;
