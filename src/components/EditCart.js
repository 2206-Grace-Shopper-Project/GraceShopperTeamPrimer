import React from "react";
import {getEachCartByUser, updateMovieQuantity } from "../api";




const EditCart = () => {

const handleSubmit = async () => {

}



return(

    <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="quantity">Qty:</label>
                <input type="number" required name="quantity" min="1"/>
                <button type="submit">Update Your Review</button>
            </form>
            
        </div>
)

}







export default EditCart;