import React, { useState } from "react";
import { removeMovieFromACart, getEachCartByUser } from "../api";

const RemoveMovie = ({userDataObj}) => {
    const [movies, setMovies] = useState([])
    const userId = userDataObj.id
console.log(userDataObj,'UDO')
console.log(userId)


    async function handleOnClick (event) {
        event.preventDefault();
        const userCart = await getEachCartByUser(userId) 
        console.log(userCart) 
        setMovies(userCart)
        movies.map((item)=>{
             let movie = item.movies
             return (
                movie.map(async (movies)=>{
                    let id = movies.cartMoviesId
                    const response = await removeMovieFromACart(id)
                    console.log(response, "this is response from Map")
                })
             )
        })
        console.log(movies, 'this is movies array')

       
    }


    return(
        <>
        <button onClick={handleOnClick}>Remove Movie</button>
        </>
    )
}


export default RemoveMovie