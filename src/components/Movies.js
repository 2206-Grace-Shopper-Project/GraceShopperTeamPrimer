import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { createNewCart } from "../api";
import CartMovies from  './CartMovies'
import FeaturedMovies from "./FeaturedMovies";
import FilterMovies from "./FilterMovies";
import SearchMovie from "./SearchMovie";

export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;
export async function createMovie(movieObj) {
    try {
      const response = await fetch(`${BASE}/movies`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            movieObj
          ),
      });
      const result = await response.json();
  
      return result;
    } catch (error) {}
}


export async function editMovieAPI(movieObj) {
    const id = movieObj.id
    try {
      const response = await fetch(`${BASE}/movies/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            movieObj
          ),
      });
      const result = await response.json();
  
      return result;
    } catch (error) {}
}
export async function deleteMovieAPI(id) {
    try {
      const response = await fetch(`${BASE}/movies/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
  
      return result;
    } catch (error) {}
}

export async function specificMovieList(searchMethod, searchFlow, limitNumber, offsetNumber) {
    try {
      const response = await fetch(`${BASE}/movies/${searchMethod}/${searchFlow}/${limitNumber}/${offsetNumber}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
  
      return result;
    } catch (error) {}
}

const Movies = ({allMovies, token, userDataObj, filteredMovieList, setFilteredMovieList}) =>{
    const [cssActive, setCSSActive] = useState(null)
    const [purchaseAmount, setPurchaseAmount] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchMethod, setSearchMethod] = useState('id')
    const [searchFlow, setSearchFlow] = useState('asc')
    const [limitNumber, setLimitNumber] = useState(50)
    const [offsetNumber, setOffsetNumber] = useState(0)

    const getCurrentPageMovies = async (passedInPage)=>{
        const offsetNumber = (passedInPage - 1) * 50
        const moviesToDisplay = await specificMovieList(searchMethod, searchFlow, limitNumber, offsetNumber)
        console.log(moviesToDisplay, '!')
        setFilteredMovieList(moviesToDisplay)
    }

    const handlePaginationPrev = (event) =>{
    event.preventDefault()
    setPageNumber(pageNumber - 1)
    getCurrentPageMovies(Number(event.target.value))
    }

    const handlePaginationNext = (event) =>{
        event.preventDefault()
    setPageNumber(pageNumber + 1)
    getCurrentPageMovies(Number(event.target.value))
    }
    const handlePageClick = (event) =>{
        event.preventDefault()
        setPageNumber(Number(event.target.id))
        getCurrentPageMovies(Number(event.target.id))
    }
    useEffect(()=>{
        getCurrentPageMovies(pageNumber)
    },[searchMethod, searchFlow])


    return(
        <>
        <h1 id="movieHeader">Welcome, Find a Movie!</h1>
        {/* <FeaturedMovies allMovies={allMovies}/> */}

        <SearchMovie allMovies={allMovies} filteredMovieList={filteredMovieList} setFilteredMovieList={setFilteredMovieList}/>
        <FilterMovies/>
        <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className="pagination" id={1} onClick={handlePageClick}>1</a>
                 <a href="#" className="pagination" id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className="pagination" id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className="pagination" id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className="pagination" id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className="pagination" id={6} onClick={handlePageClick}>6</a>

                 {pageNumber !== 6 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>}

            </div>
        <div id="movieComponent">

        {filteredMovieList && filteredMovieList.length ? filteredMovieList.map((movie, index)=>{
            let title = movie.title
            let linkTitle = movie.title.replace(/\s+/g, '+')
            let genre = movie.genre
            let year = movie.year
            let plot = movie.plot
            let displayPrice = movie.price
            let realPrice = movie.price + .99
            let id = movie.id
            let inventory = movie.inventory
            let className = null
            if(cssActive === movie.id){
                className = 'activeSeeMore'
            }
            
            return(
            <div key={id} className="movieContainer" >
            <div className="topRowContainer">
            <img className="moviePoster" src={movie.poster}/>
              <div className="textContainer">
                <div className="priceText movieText">
                    <span>${displayPrice}.99</span>
                    <br></br>
                    {inventory < 10 && inventory > 0  ? <><span className="almostOutOfStock">Only {inventory} left in stock</span><br></br></> : <br></br>}
                    {inventory === 0 ? <><span className="outOfStock">Out of stock</span><br></br></> : <br></br>}
                    <label htmlFor="quantity">Qty: </label>
                    <input type="number" id={movie.id} name="quantity" min="1" max={movie.inventory} onBlur={(event)=>event.target.value = ''} onChange={(event)=>{
                        console.log(event.target.value)
                        setPurchaseAmount(Number(event.target.value))
                        if(event.target.value > inventory){
                            alert('You cannot purchase more than what is in stock')
                            setPurchaseAmount(1)
                            event.target.value = 1
                        }}} ></input>
                   
                        <span><CartMovies userDataObj={userDataObj} id={id} purchaseAmount={purchaseAmount} realPrice={realPrice} title={title}/></span>
                    </div>
              </div>
              </div>
              <div className="movieInfoContainer"> <NavLink style={{color: 'black'}} to={`/movies/${linkTitle}`}>{title}  ({year})</NavLink>
              <div className={`${className} movieInfo`}>{genre}  
              <br></br> 
              <br></br> 
              <span className='furtherMovieInfo'>{plot} </span>
              <br></br> 
              <br></br> 
              <span className='furtherMovieInfo'>Starring: {movie.actors} </span>
              <br></br>
              <br></br> 
              <span className='furtherMovieInfo'>Directors: {movie.directors} </span>
              <br></br> 
              <span className='furtherMovieInfo'>{movie.rated} </span>
              </div>
              <p className="seeMoreTag"><a className="seeMoreLink" href="#" onClick={
                (event)=>{
                event.preventDefault()
                cssActive && cssActive === movie.id ? setCSSActive(null) : setCSSActive(movie.id) 
                console.log(cssActive)}}>
                    { cssActive === movie.id ? '↑ See less' : '↓ See more' }</a>
                </p>
              </div>
              
            </div>
            )
        }) : <>Something Broke</>}
            <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className="pagination" id={1} onClick={handlePageClick}>1</a>
                 <a href="#" className="pagination" id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className="pagination" id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className="pagination" id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className="pagination" id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className="pagination" id={6} onClick={handlePageClick}>6</a>

                 {pageNumber !== 6 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>}

            </div>
        </div>
        </>
    )
}



export default Movies