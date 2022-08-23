import React, { useState } from "react";
import { editMovieAPI } from "../api";


const EditMovie = ({setEditMovieEntry, movieObj, setMovieObj}) =>{
    const[movieActors, setMovieActors] = useState(movieObj.actors)
    const[movieDirectors, setMovieDirectors] = useState(movieObj.directors)
    const[movieGenre, setMovieGenre] = useState(movieObj.genre)
    const[movieInventory, setMovieInventory] = useState(movieObj.inventory)
    const[moviePlot, setMoviePlot] = useState(movieObj.plot)
    const[moviePoster, setMoviePoster] = useState(movieObj.poster)
    const[moviePrice, setMoviePrice] = useState(movieObj.price)
    const[movieRated, setMovieRated] = useState(movieObj.rated)
    const[movieTitle, setMovieTitle] = useState(movieObj.title)
    const[movieYear, setMovieYear] = useState(movieObj.year)
console.log(movieObj, 'when component loads')


    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log('I was clicked')
        console.log(movieObj)
        const newMovieObj = {
            id: movieObj.id,
            actors: movieActors,
            directors: movieDirectors,
            genre: movieGenre,
            inventory: Number(movieInventory),
            plot: moviePlot,
            poster: moviePoster,
            price: Number(moviePrice),
            rated: movieRated,
            title: movieTitle,
            year: Number(movieYear)
        }
        console.log(newMovieObj)
        editMovieAPI(newMovieObj)
        setMovieObj(newMovieObj)
        setEditMovieEntry(false)

    }
return(
    <>
        <form onSubmit={handleSubmit}>
            <input name="title" maxLength={255} value={movieTitle} onChange={(event)=>setMovieTitle(event.target.value)} required placeholder='title'></input>
            <input name="genre" maxLength={255} value={movieGenre} onChange={(event)=>setMovieGenre(event.target.value)} required placeholder='genre'></input>
            <input name="year" type='number' value={movieYear} onChange={(event)=>setMovieYear(event.target.value)} required placeholder='year'></input>
            <input name="rated" maxLength={255} value={movieRated} onChange={(event)=>setMovieRated(event.target.value)} required placeholder='rated'></input>
            <input name="actors" maxLength={255} value={movieActors} onChange={(event)=>setMovieActors(event.target.value)} required placeholder='actors'></input>
            <input name="directors" maxLength={255} value={movieDirectors} onChange={(event)=>setMovieDirectors(event.target.value)} required placeholder='directors'></input>
            <input name="price" type='number' value={moviePrice} onChange={(event)=>setMoviePrice(event.target.value)} required placeholder='price'></input>
            <input name="poster" maxLength={255} value={moviePoster} onChange={(event)=>setMoviePoster(event.target.value)} required placeholder='poster'></input>
            <input name="inventory" type='number' value={movieInventory} onChange={(event)=>setMovieInventory(event.target.value)} required placeholder='inventory'></input>
            <textarea name="plot" rows="4" cols="50" value={moviePlot} onChange={(event)=>setMoviePlot(event.target.value)} required placeholder='plot'></textarea>
            <button type="submit">Submit</button>
        </form>
        <button onClick={()=>setEditMovieEntry(false)}>Cancel</button>

    </>
)


}




export default EditMovie