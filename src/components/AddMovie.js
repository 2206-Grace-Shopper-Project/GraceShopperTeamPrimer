import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


const AddMovie = ({token}) =>{

    const handleSubmit = async(event) => {
        event.preventDefault()
        await addNewMovie(event, token)
    }

    return(
        <div>
            <div className='movieForm'>
                <label>Add New Movie</label>
            <form onSubmit={handleSubmit} id="newMovieForm">
                <input name="title" placeholder='title'></input>
                <input name="genre" placeholder='genre'></input>
                <input name="year" placeholder='year'></input>
                <input name="rated" placeholder='rated'></input>
                <input name="actors" placeholder='actors'></input>
                <input name="directors" placeholder='directors'></input>
                <input name="plot" placeholder='plot'></input>
                <input name="price" placeholder='price'></input>
                <input name="poster" placeholder='poster'></input>
                <input name="inventory" placeholder='inventory'></input>
                <button type="Submit" onClick={() => {}}>Add New Movie</button>
            </form>
            </div>
        </div>
    )
}

export default AddMovie
