import React from "react";
import { getEachCartByUser, updateMovieQuantity } from "../api";

const EditCart = ({
  userDataObj,
  CMI,
  movieId,
  setCanEdit,
  myCart,
  setMyCart,
}) => {
  let userId = userDataObj.id;
  let id = CMI;
  const handleSubmit = async (event) => {
    event.preventDefault();
    let quantity = event.target.quantity.value;
    console.log("userId in Edit cart", userId);
    console.log("CMI", id);

    if (myCart) {
      const cart = await getEachCartByUser(userId);
      let cartId = cart.id;
      console.log("CartId", cartId);
      console.log("movieId??", movieId);
      console.log(event.target.quantity.value, "new Quantity ");
      console.log("this should be your cart", cart);
      const response = await updateMovieQuantity(id, quantity);
      console.log("this is response from edit movie", response);
      
      const newQuantity = [...myCart.movies];
      newQuantity.forEach((element, index) => {
          if (element.cartMoviesId === id) {
             console.log(element, 'this is your element')
            if(element.quantity){
                response.quantity = element.quantity
                
              newQuantity.splice(index, 1, response);
              cart.movies[10] = newQuantity;}
           
            }
            
            setMyCart(cart);
            setCanEdit(false);
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Qty:</label>
        <input type="number" required name="quantity" min="1" />
        <button type="submit">Update Qty</button>
      </form>
      <button
        className="cancelButton"
        onClick={() => {
          setCanEdit(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditCart;
