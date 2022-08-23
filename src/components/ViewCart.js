import e from "cors";
import React, { useEffect, useState } from "react";
import {
  createNewCart,
  getEachCartByUser,
  getMyAddresses,
  hideCart,
  createNewOrder,
} from "../api";
import EditCart from "./EditCart";
import RemoveMovie from "./RemoveMovie";
import { clearGuestUser } from "../auth";


const ViewCart = ({ userDataObj, guestUserObj, currentUser}) => {
  
  const [myCart, setMyCart] = useState([]);
  const [addressOnOrder, setAddressOnOrder] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [canEdit, setCanEdit] = useState(null);
  const [orderAddress, setOrderAddress] = useState([]);
  const [confirmPurchase, setConfirmPurchase] = useState(false)
  let totalPrice = 0;

  async function myCartToView(userId) {
    
    console.log(userId,"whai it is")
    const cartObj = await getEachCartByUser(userId);
    console.log(cartObj, "cartOBJ");
    setMyCart(cartObj);
    console.log(myCart, "this is my cart in the function");
    
    let addressInfo = await getMyAddresses(userId);
    // console.log(addressInfo.address, "!!!!!!!!");
    setAddressOnOrder(addressInfo.address);
    if (addressInfo?.address?.length) {
      setOrderAddress(addressInfo.address[0].address);
    }
  }

  useEffect(() => {
    if(userDataObj){
let userId = userDataObj.id
  myCartToView(userId)}else{
   let userId = guestUserObj.id
    myCartToView(userId);
  }
    
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const cartId = myCart.id;
    await hideCart(cartId);
    console.log(orderAddress, "EVENT");
    if(userDataObj){
  let userId = userDataObj.id;
      let email = userDataObj.email;
    let date = new Date().getTime();
    let address = orderAddress;
    let price = Math.round(totalPrice * 100) / 100;
    // console.log(addressOnOrder[0].address);
    console.log(email, date, address, price);

    await createNewOrder(cartId, address, email, date, price)
    const newestCartEver = await createNewCart(userId);
    setUserCart(newestCartEver);
    console.log(newestCartEver, 'newestcartever')
      setMyCart(userCart)
    console.log(myCart, 'newest cart ever')
    window.location.assign("/");
    alert('Order placed! A receipt has been sent to your order history!')

  }else{
    let userId = guestUserObj.id;
    let email = guestUserObj.email;
  let date = new Date().getTime();
  let address = orderAddress;
  let price = Math.round(totalPrice * 100) / 100;
  // console.log(addressOnOrder[0].address);
  console.log(email, date, address, price);

  await createNewOrder(cartId, address, email, date, price)
    clearGuestUser();
    window.location.assign("/");
    alert('Order placed! Thank you for visiting please make an account for in depth order history!')
    }
    
    
  };
  // console.log(myCart, "myCart");

  return (
    <>
      {" "}
      {myCart ? (
        <>
          {/* <h1 className="viewCartTitle">Cart</h1> */}

          <div>
            <h3>{myCart.name}'s picks</h3>
            {myCart.movies ? (
              myCart.movies.length ? (
                <div>
                  {myCart.movies.map((movie, index) => {
                    // console.log(movie, "MOVIE")
                    let CMI = movie.cartMoviesId;
                    let movieId = movie.id;
                    let quantity = movie.quantity;
                    // setTotalPrice(totalPrice + (movie.price * quantity))
                    totalPrice += (movie.price + 0.99) * quantity;
                    return (
                      <div className="singleCart" key={index}>
                        <p>Movie Title: {movie.title}</p>
                        <img id='movie-poster' src={movie.poster} />
                        <p>Qty: {quantity}</p>
                        <p>${movie.price}.99 Each</p>

                        <button
                          onClick={() => {
                            setCanEdit(CMI);
                          }}
                        >
                          Edit Cart
                        </button>
                        {canEdit === CMI ? (
                          <>
                            <EditCart
                              userDataObj={userDataObj}
                              CMI={CMI}
                              movieId={movieId}
                              quantity={quantity}
                              setCanEdit={setCanEdit}
                              myCart={myCart}
                              setMyCart={setMyCart}
                            />
                            <RemoveMovie
                              myCart={myCart}
                              setMyCart={setMyCart}
                              userDataObj={userDataObj}
                              CMI={CMI}
                            />{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}{" "}
                  <div>
                    <p className='cart-total'>TOTAL: {Math.round(totalPrice * 100) / 100}</p>
                    <button onClick={()=>{
                      setConfirmPurchase(true)
                    }}>Checkout Cart</button>{" "}
                    { confirmPurchase ? <span>
                      <p>CONFIRM PURCHASE</p>
                      <form onSubmit={handleOnSubmit}>
                        {addressOnOrder?.length ? 
                        <select
                          name="address"
                          onChange={(event) => {
                            setOrderAddress(event.target.value);
                          }}
                        >
                          {addressOnOrder.map((address, index) => {
                            return (
                              <option key={index}>{address.address}</option>
                            );
                          })}
                        </select>
                        :  
                        <input name="address" type="text" placeholder="Enter Address"/>}
                        <button type="submit">
                          purchase
                        </button>
                      </form>
                    </span> : <></>}
                  </div>{" "}
                </div>
              ) : (
                <h4>oops... looks like theres nothing in your cart.</h4>
              )
            ) : (
              <h4>loading your cart</h4>
            )}
            {/* { myCart.movies.length ? () : <></>    }   */}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ViewCart;
