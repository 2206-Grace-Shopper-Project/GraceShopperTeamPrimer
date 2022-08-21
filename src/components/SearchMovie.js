import React, { useState } from "react";
import { specificMovieList } from "../api";


const SearchMovie = ({allMovies, filteredMovieList, setFilteredMovieList})=>{
    const [filterParams, setFilterParams] = useState(0)

    const handleOnChange = (event)=>{
       console.log(event.target.value)

    }
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        console.log(event.target)
        event.target.reset()
        }
    
    return(
    <div className="filterContainer">
        <form onSubmit={handleSubmit}>
            <input type="search" id="asd" required placeholder="Search Movies" name="movieSearchBar"></input>
        </form>
        {/* <div className="break"></div> */}
            <form>
                <select onChange={handleOnChange} className='sortby-option'>
                <option value={1}>Sort by: Ranking </option>
                <option value={2}>Sort by: Title: A-Z </option>
                <option value={3}>Sort by: Title: Z-A </option>
                <option value={4}>Sort by: Price: High to Low </option>
                <option value={5}>Sort by: Price: Low to High </option>
            </select>
            </form>
        
    </div>

    )
}




export default SearchMovie