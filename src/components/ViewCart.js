import React, { useEffect, useState } from "react";
import { getEachCartByUser } from "../api";

const ViewCart = ({ userDataObj }) => {
  const userId = userDataObj.id;
  const [myCart, setMyCart] = useState([]);

  async function myCartToView() {
    const cartObj = await getEachCartByUser(userId);
    setMyCart(cartObj);
    console.log(myCart, 'this is my cart in the function')
  }

useEffect(()=>{
    myCartToView()
},[])

  return (
    <>
      <h1 className="viewCartTitle">Cart</h1>
      {myCart.map((item, index) => { 
        return(
        <div key={index}>
          <h3>{item.name}'s picks</h3>
          {item.movies ? (
            item.movies.map((movie, index) => {
                return(
              <div key={index}>
                <p>Movie Title: {movie.title}</p>
                <p>Rating: {movie.rated}</p>
                <p>Qty: {movie.quantity}</p>
                <p>${movie.price}</p>
              </div>
            )})
          ) : (
            <h4>oops... looks like theres nothing in your cart.</h4>
          )}
        </div>
      )})}
    </>
  );
};

export default ViewCart;