import React, { useState } from "react";
import { createNewCart, getEachCartByUser } from "../api";
import { storeUserData, grabUser } from "../auth";
import DeleteCarts from "./DeleteCarts";

const Carts = (userId) => {
  const [userCart, setUserCart] = useState({});
  let userData = localStorage.getItem("userData");

  //onClick for create a new cart
  const handleOnClick = async (event) => {
    event.preventDefault();
    let data = grabUser(userData);
    let userId = data.id;
    const canCreate = await getEachCartByUser(userId);

    console.log(canCreate);
    console.log(canCreate.length);

    if (!canCreate.length) {
      const response = await createNewCart(userId);

      return response;
    } else {
      setUserCart(canCreate[0]);
    }
    //end of create cart function
  };

  return (
    <>
      <button onClick={handleOnClick}>Create Cart</button>
      <div>
        {/* <h2>Your cart</h2>
        {allCarts.map((cart, index) => {
          <div key={index}>
            <p>{}</p>
            <p>{}</p>
            <p>{}</p>
            <p>{}</p>
          </div>;
        })} */}

        <>
          <DeleteCarts />
        </>
      </div>
    </>
  );
};

export default Carts;
