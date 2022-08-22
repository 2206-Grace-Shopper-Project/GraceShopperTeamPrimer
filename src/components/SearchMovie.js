import React, { useState } from "react";
import { specificMovieList } from "../api";


const SearchMovie = ({allMovies, filteredMovieList, setFilteredMovieList, pageNumber, setSearchFlow, setSearchMethod, setPageNumber, setShowMoviePagination})=>{
    const [filterParams, setFilterParams] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')

    const handleOnChange = async (event)=>{
        let searchMethod = null
        let searchFlow = null
        let limitNumber = 50
        let offsetNumber = (pageNumber - 1) * 50

        if(Number(event.target.value) === 1){
            setSearchMethod('id') 
            setSearchFlow('asc')
            searchMethod = 'id'
            searchFlow = null
        }
        if(Number(event.target.value) === 2){
            setSearchMethod('title') 
             setSearchFlow('asc')
             searchMethod = 'title'
            searchFlow = 'asc'
       }
       if(Number(event.target.value) === 3){
            setSearchMethod('title') 
            setSearchFlow('desc')
            searchMethod = 'title'
            searchFlow = 'desc'
        }
        if(Number(event.target.value) === 4){
            setSearchMethod('price') 
            setSearchFlow('desc')
            searchMethod = 'price'
            searchFlow = 'desc'
        }
        if(Number(event.target.value) === 5){
            setSearchMethod('price') 
            setSearchFlow('asc')
            searchMethod = 'price'
            searchFlow = 'asc'
       }

    //    console.log(event.target.value)
    //     setFilterParams(event.target.value)
    //     console.log(pageNumber)

        const moviesToDisplay = await specificMovieList(searchMethod, searchFlow, limitNumber, offsetNumber)
        setFilteredMovieList(moviesToDisplay)

    }
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        setSearchTerm(event.target.movieSearchBar.value)

    function movieMatches(movie, searchTerm) {
      if (
        movie.plot.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.actors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.directors.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    const filteredMovies = allMovies.filter((movie) =>
      movieMatches(movie, event.target.movieSearchBar.value)
    );
    setFilteredMovieList(filteredMovies);
    setShowMoviePagination(false)
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


//                <form>
//                 <select name="address">
//                 {addressOnOrder.address.map((address)=>{
//         return(
//             <option>{address.address}</option>
//              ) 
//             })}
//             </select>
//             <button type="submit" onClick={handleOnClick}>purchase</button>
//             </form>


// let address = event.target.address.value