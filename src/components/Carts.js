import React, { useState } from "react";
import { createNewCart, getEachCartByUser } from "../api";
import { storeUserData, grabUser } from "../auth";

const Carts = (userId) => {
  const [allCarts, setAllCarts] = useState([]);
  let userData = localStorage.getItem("userData");

  //onClick for create a new cart
  const handleOnClick = async (event) => {
    event.preventDefault();
    let data = grabUser(userData);
    let userId = data.id;
    const canCreate = await getEachCartByUser(userId);
    
    console.log(canCreate)

    if (canCreate.isPurchased === false) {
      return canCreate;
    } else if (canCreate.isPurchased === true){
      const response = await createNewCart(userId);
      return response
    }
    //end of create cart function
  };

  return (
    <>
      <button onClick={handleOnClick}>Create Cart</button>
      <div>
        <h2>Your cart</h2>
        {allCarts.map((cart, index) => {
          <div key={index}>
            <p>{}</p>
            <p>{}</p>
            <p>{}</p>
            <p>{}</p>
          </div>;
        })}
      </div>
    </>
  );
};

export default Carts;
