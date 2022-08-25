import React, { useEffect, useState } from "react";
import {
  addMovieToCart,
  createNewCart,
  createUser,
  getEachCartByUser,
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
    const response = await createNewCart(userId);
    let cartId = response.id;
    const movieId = id;
    let quantity = purchaseAmount;
    const movieInCart = await addMovieToCart(cartId, movieId, quantity);
    setPurchaseMovieId(null);
  }
  const getGuestUser = async () => {
    const guestOldCart = await getEachCartByUser(tempId.id);
    if (guestOldCart) {
      let cartId = guestOldCart.id;
      const movieId = id;
      let quantity = purchaseAmount;
      await addMovieToCart(cartId, movieId, quantity);
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
      generateCart(userId);
      setTempId(userId);
    }
  }, [guestUserObj]);

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
      } else {
        let quantity = purchaseAmount;
        const cartId = currentCart.id;
        const movieId = id;
        const response = await addMovieToCart(cartId, movieId, quantity);
      }
    }
    /*  
this creates a guest user if we are not logged in and add a movie to cart   
*/

    if (!userDataObj && !guestUserObj) {
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
      let cartId = guestOldCart.id;
      const movieId = id;
      let quantity = purchaseAmount;
      await addMovieToCart(cartId, movieId, quantity);
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
