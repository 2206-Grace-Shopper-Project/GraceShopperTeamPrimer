import React from "react";
import { createNewCart } from "../api";
import { storeUserData, grabUser } from "../auth";

const Carts = (userId) => {
  let userData = localStorage.getItem("userData");

  //onClick for create a new cart
  const handleOnClick = async (event) => {
    event.preventDefault();
    let data = grabUser(userData);
    let userId = data.id;
    const response = await createNewCart(userId);

    return console.log(response, "this is the respnse from the Cart component");
  };

  return (
    <>
      <button onClick={handleOnClick}>Create Cart</button>
    </>
  );
};

export default Carts;
