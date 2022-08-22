import React, { useEffect, useState } from "react";
import { createNewCart, getEachCartByUser } from "../api";
import ViewCart from "./ViewCart";

const Carts = ({ userDataObj }) => {
  let userId = userDataObj.id;
  const [userCart, setUserCart] = useState(null);

  useEffect(() => {
    doesCartExist();
  }, []);
  //onClick for create a new cart

  async function doesCartExist() {
    const canCreate = await getEachCartByUser(userId);
    if (!canCreate.length) {
      setUserCart(null);
    } else {
      setUserCart(canCreate[0]);
    }
  }

  // const handleOnClick = async (event) => {
  //   event.preventDefault();
  //   if (userCart === null) {
  //     const response = await createNewCart(userId);
  //     console.log(response, "CreateCart Response");
  //   }

    //end of create cart function
  // };

  return (
    <>
        <div>
          <ViewCart userDataObj={userDataObj} />
        </div>
    </>
  )
};

export default Carts;
