import React, { useEffect, useState } from "react";
import {
  createNewCart,
  getEachCartByUser,
  getMyAddresses,
  hideCart,
  createNewOrder
} from "../api";
import EditCart from "./EditCart";
import RemoveMovie from "./RemoveMovie";

const ViewCart = ({ userDataObj }) => {
  const userId = userDataObj.id;
  const [myCart, setMyCart] = useState([]);
  const [addressOnOrder, setAddressOnOrder] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [canEdit, setCanEdit] = useState(null);
  let totalPrice = 0

  console.log(userDataObj, 'userDataObj')

  async function myCartToView() {
    const cartObj = await getEachCartByUser(userId);
    console.log(cartObj, "cartOBJ");
    setMyCart(cartObj);
    console.log(myCart, "this is my cart in the function");
    let id = userDataObj.id;
    let addressInfo = await getMyAddresses(id);
    setAddressOnOrder(addressInfo);
  }

  useEffect(() => {
    myCartToView();
  }, []);

  const handleOnClick = async (event) => {
    event.preventDefault();
    const cartId = myCart.id;
    await hideCart(cartId);
    console.log(event, 'EVENT')

    let userId = userDataObj.id
    let email = userDataObj.email
    let date = new Date().getTime()
    let addressArr = addressOnOrder.address.map((address)=>{
        return address.address
    })
    let address = addressArr.toString()
    let price = totalPrice

    console.log( email, date, address, price)
    

    await createNewOrder(cartId, address, email, date, price)
    const newestCartEver = await createNewCart(userId);
    setUserCart(newestCartEver);

console.log(newestCartEver, 'newest cart ever')



  };
  console.log(myCart, "myCart");
  
  return (
    <>
      {" "}
      {myCart ? (
        <>
          <h1 className="viewCartTitle">Cart</h1>

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
                    totalPrice += (movie.price + .99) * quantity
                    return (
                      <div className="singleCart" key={index}>
                        <p>Movie Title: {movie.title}</p>
                        <img className="" src={movie.poster} />
                        <p>Qty: {quantity}</p>
                        <p>${movie.price}.99 Each</p>

                        <button
                          onClick={() => {
                            setCanEdit(CMI);
                          }}
                        >
                          Edit Cart
                        </button>
                        {canEdit === CMI? (
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
                    <p>TOTAL: {totalPrice}</p>
                    <p>CONFIRM PURCHASE</p>{" "}
                    <button onClick={handleOnClick}>purchase</button>
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
