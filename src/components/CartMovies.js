import React, { useEffect, useState } from "react";
import {
  addMovieToCart, createNewCart,
  createUser, getEachCartByUser
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
  setGuestUserObj,
}) => {
  //useStates
  const [purchaseMovieId, setPurchaseMovieId] = useState(null);
  const [tempId, setTempId] = useState(guestUserObj);

  // let userId = null;

  //this creates a cart for the guest user after we create a user lower in the code

  async function generateCart(userId) {
    console.log("createcart function");
    const response = await createNewCart(userId);
    let cartId = response.id;
    const movieId = id;
    let quantity = purchaseAmount;
    const movieInCart = await addMovieToCart(cartId, movieId, quantity);
    console.log(movieInCart, "this should be added to cart");
    console.log(response, "newCart");
    setPurchaseMovieId(null);
  }
  const getGuestUser = async () => {
    const guestOldCart = await getEachCartByUser(tempId.id);
    if (guestOldCart) {
      console.log("HavecartFunction");
      let cartId = guestOldCart.id;
      const movieId = id;
      let quantity = purchaseAmount;
      const result = await addMovieToCart(cartId, movieId, quantity);
      console.log(
        result,
        "if they have a cart but are not logged in and they added a movie"
      );
    }
  };

  useEffect(() => {
    if (tempId?.id && purchaseMovieId) {
      getGuestUser();
    }
  }, [tempId]);

  useEffect(() => {
    if (grabGuestUser() && purchaseMovieId) {
      let userId = grabGuestUser().id;
      console.log(userId, "useridin Effect");
      generateCart(userId);
      setTempId(userId);
    }
  }, [guestUserObj]);

  // console.log(guestUserObj,'GUO')
  const handleOnClick = async (event) => {
    event.preventDefault();

    setPurchaseMovieId(id);

    if (userDataObj) {
      let userId = userDataObj.id;
      const currentCart = await getEachCartByUser(userId);
      if (!currentCart) {
        const newCart = await createNewCart(userId);
        let quantity = purchaseAmount;
        const cartId = newCart.id;
        const movieId = id;
        const response = await addMovieToCart(cartId, movieId, quantity);
        console.log(
          response,
          "this is response from creating/adding movie to cart"
        );
      } else {
        let quantity = purchaseAmount;
        const cartId = currentCart.id;
        const movieId = id;
        const response = await addMovieToCart(cartId, movieId, quantity);
        console.log(response, "this is response from adding movie to cart");
      }
    }
    /*  
this creates a guest user if we are not logged in and add a movie to cart   
*/

    if (!userDataObj && !guestUserObj) {
      console.log("onclick working ");
      let name = "guest";
      let password = "guestuser";
      let email = null;
      const guestUserInfo = await createUser(name, email, password);
      const guestUser = {};
      guestUser.id = guestUserInfo.user.id;
      guestUser.name = guestUserInfo.user.name;
      storeGuestUserData(guestUser);
      setGuestUserObj(guestUser);
    }

    if (guestUserObj?.id) {
      const guestOldCart = await getEachCartByUser(guestUserObj.id);
      console.log("HavecartFunction");
      let cartId = guestOldCart.id;
      const movieId = id;
      let quantity = purchaseAmount;
      const result = await addMovieToCart(cartId, movieId, quantity);
      console.log(
        result,
        "if they have a cart but are not logged in and they added a movie"
      );
    }
  };

  return (
    <>
      {showButton ? (
        <button id="add-to-cart" onClick={handleOnClick}>
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
