import React from "react";
import { getEachCartByUser, updateMovieQuantity } from "../api";

const EditCart = ({
  userDataObj,
  CMI,
  movieId,
  setCanEdit,
  myCart,
  setMyCart,
}) => {
  let userId = userDataObj.id;
  let id = CMI;
  const handleSubmit = async (event) => {
    event.preventDefault();
    let quantity = event.target.quantity.value;
    console.log("userId in Edit cart", userId);
    console.log("CMI", id);

    // going to bring in a addMovieToCart function
    //  send the response to replace that movie and add it to a copy of an array and then try and splice the movies array in my cart to update the mycart object in whole and get it to automatically update

    if (myCart) {
      let quantity = event.target.quantity.value;
      const cart = await getEachCartByUser(userId);
      console.log(cart, "just chcking my cart for today");
      const newQ = await updateMovieQuantity(id, quantity);
      console.log(newQ, "newQuantity");
      let cartId = newQ.cartId;
      let movieId = newQ.movieId;
      quantity = newQ.quantity;
      console.log(quantity, "QUANTITY");
      console.log(movieId, "MOVIEID");
      console.log(cartId, "CARTID");

      let newMovies = [...myCart.movies];
      newMovies.map((element) => {
        if (
          movieId === element.id &&
          cartId === element.cartId &&
          CMI === element.cartMoviesId
        ) {
          element.quantity = quantity;
        }
        console.log(element.quantity, "this should be the new quantity");
        let finalMovies = [...newMovies];
        console.log(finalMovies, "is this possible");
        cart.movies = finalMovies;
      });

      setMyCart(cart);
      setCanEdit(false);

      // let newMovieObj = await addMovieToCart(cartId, movieId, quantity)

      // console.log(newMovieObj,"this is a new movie")
    }

    // if (myCart) {
    //   const cart = await getEachCartByUser(userId);
    //   let cartId = cart.id;
    //   console.log("CartId", cartId);
    //   console.log("movieId??", movieId);
    //   console.log(event.target.quantity.value, "new Quantity ");
    //   console.log("this should be your cart", cart);
    //   const response = await updateMovieQuantity(id, quantity);
    //   console.log("this is response from edit movie", response);

    //   const newQuantity = [...myCart.movies];
    //   newQuantity.forEach((element, index) => {
    //       if (element.cartMoviesId === id) {
    //          console.log(element, 'this is your element')
    //         if(element.quantity){
    //             response.quantity = element.quantity

    //           newQuantity.splice(index, 1, response);
    //           cart.movies[10] = newQuantity;}

    //         }

    //         setMyCart(cart);
    //         setCanEdit(false);
    //   });
    // }
  };

  return (
    <div id = 'edit-cart'>
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
