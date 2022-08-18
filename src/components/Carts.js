import React, { useEffect, useState } from "react";
import { createNewCart, getEachCartByUser } from "../api";
import { storeUserData, grabUser } from "../auth";
import PurchaseItems from "./PurchaseItems";
import RemoveMovie from "./RemoveMovie";
import ViewCart from "./ViewCart";

const Carts = ({ userDataObj }) => {
  let userId = userDataObj.id;
  const [userCart, setUserCart] = useState(null);
    
useEffect(()=>{
doesCartExist();
},[])
  //onClick for create a new cart

  async function doesCartExist(){
    const canCreate = await getEachCartByUser(userId);
    if (!canCreate.length) {
      setUserCart(null);
    } else {
      setUserCart(canCreate[0]);
    }
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    if (userCart === null) {
      const response = await createNewCart(userId);
      console.log(response, 'this is the response from create')
    }
   

    //end of create cart function
  };

  return (
    <>
      <button onClick={handleOnClick}>Create Cart</button>
      <div>
        
        <div>
          <PurchaseItems
            userCart={userCart}
            setUserCart={setUserCart}
            userDataObj={userDataObj}
          />
        </div>

        <>
        <RemoveMovie userDataObj={userDataObj} />
        </>

      <div>
          <ViewCart userDataObj={userDataObj}/> 
      </div>
      </div>
    </>
  );
};

export default Carts;
