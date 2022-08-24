import React, { useEffect, useState } from "react";
import { getEachCartByUser } from "../api";
import ViewCart from "./ViewCart";

const Carts = ({ userDataObj, guestUserObj }) => {
  let userId = null;
  const [userCart, setUserCart] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    doesCartExist();
  }, []);
  //onClick for create a new cart

  async function doesCartExist() {
    if (userDataObj) {
      userId = userDataObj.id;
      setCurrentUser(userId);
    }
    if (guestUserObj) {
      userId = guestUserObj.id;
      setCurrentUser(userId);
    }
    const canCreate = await getEachCartByUser(userId);
    if (!canCreate.length) {
      setUserCart(null);
    } else {
      setUserCart(canCreate[0]);
    }
  }

  return (
    <>
      <div>
        {guestUserObj || userDataObj ? <ViewCart
          userDataObj={userDataObj}
          guestUserObj={guestUserObj}
          currentUser={currentUser}
          />
        : <div id='empty-cart'>
        <h4 className='cart-empty' >oops... looks like theres nothing in your cart.</h4>
        </div> }
      </div>
    </>
  );
};

export default Carts;
