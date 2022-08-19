import React, { useEffect, useState } from "react";
import { createNewCart, getEachCartByUser, getMyAddresses, hideCart, createNewOrder } from "../api";
import RemoveMovie from "./RemoveMovie";

const ViewCart = ({ userDataObj }) => {
  const userId = userDataObj.id;
  const [myCart, setMyCart] = useState([]);
  const [addressOnOrder, setAddressOnOrder] = useState([])
  const [userCart, setUserCart] = useState([]);

  async function myCartToView() {
    const cartObj = await getEachCartByUser(userId);
    console.log(cartObj,'cartOBJ')
    setMyCart(cartObj);
    console.log(myCart, 'this is my cart in the function')
    let id = userDataObj.id
    let addressInfo = await getMyAddresses(id)
        setAddressOnOrder(addressInfo)
  }

useEffect(()=>{
    myCartToView()
},[])

const handleOnClick = async (event) => {
  event.preventDefault();
  const cartId = myCart.id
  const response = await hideCart(cartId)
  // console.log(event, 'EVENT')

  // let userId = userDataObj.id
  // let email = userDataObj.email
  // let date = new Date().getTime()
  // let addressArr = addressOnOrder.address.map((address)=>{
  //     return address.address
  // })
  // let address = addressArr.toString()
  
  // // console.log( email, date, address)

  // await createNewOrder(cartId, address, email, quantity, date, price)
  const newestCartEver = await createNewCart(userId)
  setUserCart(newestCartEver)
}
console.log(myCart, 'myCart')
  return (
    <> {myCart ? <>
      <h1 className="viewCartTitle">Cart</h1>
      

        <div>
          <h3>{myCart.name}'s picks</h3>
          {myCart.movies ? myCart.movies.length ? (
            myCart.movies.map((movie, index) => {
              console.log(movie, "MOVIE")
              let CMI = movie.cartMoviesId
                return(
              <div className="singleCart" key={index}>
                <p>Movie Title: {movie.title}</p><img className="" src={movie.poster}/>
                <p>Rating: {movie.rated}</p>
                <p>Qty: {movie.quantity}</p>
                <p>${movie.price}</p>
                <RemoveMovie userDataObj={userDataObj} CMI={CMI}/> 
              </div>
               
            )})
          ) : (
            <h4>oops... looks like theres nothing in your cart.</h4>
          ): <h4>loading your cart</h4>}
          <p>CONFIRM PURCHASE</p>           
          <button onClick={handleOnClick}>purchase</button>
        </div>
  </>
    : null}
    </>
  );
};

export default ViewCart;
