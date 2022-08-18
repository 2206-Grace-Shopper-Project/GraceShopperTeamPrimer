import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function addNewMovie(event, token){
    const title = event.target.title.value
    const genre = event.target.genre.value
    const year = event.target.year.value
    const rated = event.target.rated.value
    const actors = event.target.actors.value
    const directors = event.target.directors.value
    const plot = event.target.plot.value
    const price = event.target.price.value
    const poster = event.target.poster.value
    const inventory = event.target.inventory.value
    try {
        const response = await fetch(`${BASE}/movies`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                genre,
                year,
                rated,
                actors,
                directors,
                plot,
                price,
                poster,
                inventory
            }),
       })
        const result = await response.json()
        console.log(result, 'result ')
        return result
    } catch(error) {
        throw error
    }
}

const Admin = ({token}) =>{

    const handleSubmit = async(event) => {
        event.preventDefault()
        await addNewMovie(event, token)
    }

    return(
        <div>
            <NavLink to='/all-orders'>Orders</NavLink>
            <NavLink to='/all-users'>Users</NavLink>

            <h1>admin page</h1>

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

export default Admin
