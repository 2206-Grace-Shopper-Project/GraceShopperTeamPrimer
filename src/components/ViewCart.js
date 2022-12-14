import React, { useEffect, useState } from "react";
import {
  createNewCart,
  getEachCartByUser,
  getMyAddresses,
  hideCart,
  createNewOrder,
  updateMovieInventory,
} from "../api";
import EditCart from "./EditCart";
import RemoveMovie from "./RemoveMovie";
import { clearGuestUser } from "../auth";

const ViewCart = ({ userDataObj, guestUserObj, currentUser }) => {
  const [myCart, setMyCart] = useState([]);
  const [addressOnOrder, setAddressOnOrder] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [canEdit, setCanEdit] = useState(null);
  const [orderAddress, setOrderAddress] = useState([]);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  let totalPrice = 0;

  async function myCartToView(userId) {
    const cartObj = await getEachCartByUser(userId);
    setMyCart(cartObj);

    let addressInfo = await getMyAddresses(userId);
    setAddressOnOrder(addressInfo.address);
    if (addressInfo?.address?.length) {
      setOrderAddress(addressInfo.address[0].address);
    }
  }

  useEffect(() => {
    if (userDataObj) {
      let userId = userDataObj.id;
      myCartToView(userId);
    } else {
      let userId = guestUserObj.id;
      myCartToView(userId);
    }
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    for await (const movie of myCart.movies) {
      let newInventory = movie.inventory - movie.quantity;
      await updateMovieInventory(movie.id, newInventory);
    }
    const cartId = myCart.id;
    await hideCart(cartId);
    if (userDataObj) {
      let userId = userDataObj.id;
      let email = userDataObj.email;
      let date = new Date().getTime();
      let address = orderAddress;
      let price = Math.round(totalPrice * 100) / 100;

      await createNewOrder(cartId, address, email, date, price);
      const newestCartEver = await createNewCart(userId);
      setUserCart(newestCartEver);
      setMyCart(userCart);
      alert("Order placed! A receipt has been sent to your order history!");
      window.location.assign("/");
    } else {
      let email = guestUserObj.email;
      let date = new Date().getTime();
      let address = event.target[0].value;
      let price = Math.round(totalPrice * 100) / 100;

      await createNewOrder(cartId, address, email, date, price);
      clearGuestUser();
      window.location.assign("/");
      alert(
        "Order placed! Thank you for visiting please make an account for in depth order history!"
      );
    }
  };

  return (
    <>
      {" "}
      {myCart ? (
        <>
          <div>
            <h3 id="user-cart">{myCart.name}'s picks</h3>
            {myCart.movies ? (
              myCart.movies.length ? (
                <div>
                  {myCart.movies.map((movie, index) => {
                    let CMI = movie.cartMoviesId;
                    let movieId = movie.id;
                    let quantity = movie.quantity;
                    let inventory = movie.inventory;
                    totalPrice += (movie.price + 0.99) * quantity;
                    return (
                      <div className="singleCart" key={index}>
                        <img id="cart-movie-poster" src={movie.poster} />
                        <p>Movie Title: {movie.title}</p>
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
                              guestUserObj={guestUserObj}
                              inventory={inventory}
                            />
                            <RemoveMovie
                              myCart={myCart}
                              setMyCart={setMyCart}
                              userDataObj={userDataObj}
                              CMI={CMI}
                              guestUserObj={guestUserObj}
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
                    <button id='checkout-button' onClick={()=>{
                      setConfirmPurchase(true)
                    }}>Checkout Cart</button>{" "}
                    { confirmPurchase ? <div id='checkout-form'>
                      <form onSubmit={handleOnSubmit}>
                        {addressOnOrder?.length ? 
                        <div id='enter-address'>
                        <p>Choose Shipping Address:</p>
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
                        </div>
                        :  
                        <div id='enter-address'>
                         <p>Enter Shipping Address:</p>
                        <input name="address" type="text" placeholder="Street, City, State, ZIP" required/></div>}
                        <button id='purchase-button' type="submit">
                          Purchase
                        </button>
                      </form>
                    </div> : <></>}
                  </div>{" "}
                </div>
              ) : (
                <div id="empty-cart">
                  <h4 className="cart-empty">
                    oops... looks like theres nothing in your cart.
                  </h4>
                </div>
              )
            ) : (
              <h4>loading your cart</h4>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ViewCart;
