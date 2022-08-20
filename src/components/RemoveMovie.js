import React, { useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({ userDataObj, CMI, myCart, setMyCart }) => {
  const [movies, setMovies] = useState([]);
  const userId = userDataObj.id;
  let id = CMI;

  async function handleOnClick(event) {
    event.preventDefault();

    console.log(myCart, "this is MYCART!!!!");
    if (myCart) {
      const userCart = await getEachCartByUser(userId);
      await removeMovieFromACart(id);
      
            console.log(myCart, "MMOVIESSSSSSSS")
      let deletedMovie = [...myCart.movies];
      deletedMovie.forEach((element, index) => {
        if (element.id === CMI) {
            console.log("element Id should be CMI",element.id)
        //   deletedMovie.splice(index, 0);
        }
      });
      console.log(deletedMovie,"this shoud not include the delted movie")
    }

    //     // const response = await removeMovieFromACart(id)
    //     // setMovies(userCart)
    // console.log(response,'this is movies')
  }

  return (
    <>
      <button onClick={handleOnClick}>Remove Movie</button>
    </>
  );
};

export default RemoveMovie;
