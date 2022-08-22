import React from "react";
import {
  addMovieToCart,
  getEachCartByUser,
  createNewCart,
  createUser,
} from "../api";
import { grabGuestUser, storeGuestUserData } from "../auth";

const CartMovies = ({
  userDataObj,
  purchaseAmount,
  id,
  realPrice,
  title,
  showButton,
  guestUserObj,
}) => {
  let userId = null;

  const handleOnClick = async (event) => {
    event.preventDefault();
    if (userDataObj) {
      let userId = userDataObj.id;
      const currentCart = await getEachCartByUser(userId);
      if (purchaseAmount === 0) {
        let quantity = 1;
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
    } 
    
    /*  
need to keep log in info in local storage and stop it from overiding evreytime you click the button probably by making a useEffect to call my create guestuser function 
    */
    
    
    
    
    
    
    else if (purchaseAmount === 0) {
      if (!userDataObj ) {
        let name = "guest";
        let password = "guestuser";
        let email = null;
        const guestUserInfo = await createUser(name, email, password);
        const guestUser = {};
        guestUser.id = guestUserInfo.user.id;
        guestUser.name = guestUserInfo.user.name;
        storeGuestUserData(guestUser);
        console.log(guestUserObj, "why did this break");
        const value = grabGuestUser();
        console.log(value, "guesuser");
        let userId = value.id;
        const guestOldCart = await getEachCartByUser(userId);
        if (guestOldCart) {
          let cartId = guestOldCart.id;
          const movieId = id;
          let quantity = 1;
          const result = await addMovieToCart(cartId, movieId, quantity);
          console.log(
            result,
            "if they have a cart but are not logged in and they added a movie"
          );
        } else if (!guestOldCart) {
          const response = await createNewCart(userId);
          let cartId = response.id;
          const movieId = id;
          let quantity = 1;
          const movieInCart = await addMovieToCart(cartId, movieId, quantity);
          console.log(movieInCart, "this should be added to cart");
          console.log(response, "newCart");
        }
      } else {
        if (!userDataObj) {
          let name = "guest";
          let password = "guestuser";
          let email = null;
          const guestUserInfo = await createUser(name, email, password);
          const guestUser = {};
          guestUser.id = guestUserInfo.user.id;
          guestUser.name = guestUserInfo.user.name;
          storeGuestUserData(guestUser);
          let userId = guestUserObj.id;
          const guestOldCart = await getEachCartByUser(userId);
          if (!guestOldCart) {
            const response = await createNewCart(userId);
            let cartId = response.id;
            const movieId = id;
            let quantity = 1;
            const movieInCart = await addMovieToCart(cartId, movieId, quantity);
            console.log(movieInCart, "this should be added to cart");
            console.log(response, "newCart");
          } else if (guestOldCart) {
            let cartId = guestOldCart.id;
            const movieId = id;
            let quantity = 1;
            const result = await addMovieToCart(cartId, movieId, quantity);
            console.log(
              result,
              "if they have a cart but are not logged in and they added a movie"
            );
          }
        }
      }
    }

    //search if !userDataObj
    //if true the create guest user name = guest pw=guestuser
    //api call
    //save in local storage for guest
    //clear local storage at checkout
  };

  return (
    <>
      {showButton ? (
        <button
          id="add-to-cart"
          // className="priceText textContainer topRowContainer movieContainer"
          onClick={handleOnClick}
        >
          Add To Cart
        </button>
      ) : (
        <button
          className="addToCart priceText textContainer topRowContainer movieContainer"
          onClick={handleOnClick}
        >
          <span className="material-symbols-outlined" id="add-cart-icon">
            add_shopping_cart
          </span>
        </button>
      )}
    </>
  );
};

export default CartMovies;
