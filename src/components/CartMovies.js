import React from "react";
import { addMovieToCart, getEachCartByUser, createNewCart, createUser} from "../api";
import { grabGuestUser, storeGuestUserData } from "../auth";

const CartMovies = ({
  userDataObj,
  purchaseAmount,
  id,
  realPrice,
  title,
  showButton,
}) => {
  let userId = null;

  if (userDataObj) {
    userId = userDataObj.id;
  }

  const handleOnClick = async (event) => {
    event.preventDefault();
    const currentCart = await getEachCartByUser(userId);
if(!userDataObj && !currentCart){
let name = 'guest'
let password = 'guestuser'
let email = null
  const guestUserInfo = await createUser(name, email, password)

const guestUser = {}
guestUser.id = guestUserInfo.user.id
guestUser.name = guestUserInfo.user.name

storeGuestUserData(guestUser)


  console.log(guestUser,'this should be a new guest user')
    //search if !userDataObj
    //if true the create guest user name = guest pw=guestuser
    //api call
    //save in local storage for guest
    //clear local storage at checkout

    // if (purchaseAmount === 0) {
    //   let quantity = 1;
    //   const cartId = currentCart.id;
    //   const movieId = id;
    //   const response = await addMovieToCart(cartId, movieId, quantity);
    //   console.log(response, "this is response from adding movie to cart");
    // } else {
    //   let quantity = purchaseAmount;
    //   const cartId = currentCart.id;
    //   const movieId = id;
    //   const response = await addMovieToCart(cartId, movieId, quantity);
    //   console.log(response, "this is response from adding movie to cart");
    // }
  }
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
