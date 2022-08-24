import React, { useEffect, useState } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import { createMovie, createNewCart, deleteMovieAPI, editMovieAPI, specificMovieList } from "../api";
import CartMovies from  './CartMovies'
import FeaturedMovies from "./FeaturedMovies";
import FilterMovies from "./FilterMovies";
import Loading from "./Loading";
import SearchMovie from "./SearchMovie";



const Movies = ({allMovies, token, userDataObj, filteredMovieList, setFilteredMovieList, setAllMovies, setShowButton, showButton, guestUserObj, setIsLoading, setGuestUserObj}) =>{
    const [cssActive, setCSSActive] = useState(null)
    const [purchaseAmount, setPurchaseAmount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchMethod, setSearchMethod] = useState('id')
    const [searchFlow, setSearchFlow] = useState('asc')
    const [limitNumber, setLimitNumber] = useState(50)
    const [offsetNumber, setOffsetNumber] = useState(0)
    const [showMoviePagination, setShowMoviePagination] = useState(true)

    let navigate = useNavigate()

    const getCurrentPageMovies = async (passedInPage)=>{
        const offsetNumber = (passedInPage - 1) * 50
        setOffsetNumber(offsetNumber)
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
        console.log(event.target)
        setPageNumber(Number(event.target.id))
        getCurrentPageMovies(Number(event.target.id))
    }
    useEffect(()=>{
        getCurrentPageMovies(pageNumber)
        setShowButton(false)
    },[searchMethod, searchFlow])

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pageNumber])
    return(
        <>
        {allMovies?.length ? <FeaturedMovies allMovies={allMovies} setAllMovies={setAllMovies}/> : <Loading/>}

        <SearchMovie allMovies={allMovies} filteredMovieList={filteredMovieList} setFilteredMovieList={setFilteredMovieList} pageNumber={pageNumber} setSearchMethod={setSearchMethod} setSearchFlow={setSearchFlow} setPageNumber={setPageNumber} setShowMoviePagination={setShowMoviePagination}/>
        <FilterMovies allMovies={allMovies} filteredMovieList={filteredMovieList} setFilteredMovieList={setFilteredMovieList} pageNumber={pageNumber}/>
        {showMoviePagination ?  <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className={pageNumber === 1 ? "pagination activePage" : "pagination" } id={1} onClick={(handlePageClick)}>1</a>
                 <a href="#" className={pageNumber === 2 ? "pagination activePage" : "pagination" } id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className={pageNumber === 3 ? "pagination activePage" : "pagination" } id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className={pageNumber === 4 ? "pagination activePage" : "pagination" } id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className={pageNumber === 5 ? "pagination activePage" : "pagination" } id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className={pageNumber === 6 ? "pagination activePage" : "pagination" } id={6} onClick={handlePageClick}>6</a>

                 {pageNumber !== 6 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>}

            </div> : <button className="cancelSearchButton" onClick={()=>{
                setShowMoviePagination(true)
                getCurrentPageMovies(1)}}>Return to All Movies</button>}
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
                <div className="priceText movieText">
                    
                   
                       <span><CartMovies userDataObj={userDataObj} id={id} purchaseAmount={purchaseAmount} realPrice={realPrice} title={title} setShowButton={setShowButton} showButton={showButton} guestUserObj={guestUserObj} setGuestUserObj={setGuestUserObj} /></span>
                    </div>
              </div>
              <div className="movieInfoContainer"> 
              <p className='movie-titles'>{title}  ({year})</p>
              <p className='movie-prices'>${movie.price}.99</p>
                <button id='get-info-button' onClick={()=>{
                  setShowButton(true)
                  navigate(`/movies/${linkTitle}`)
                  }}>
                See More</button>
              </div>
              
            </div>
            )
        }) : <h1 id="noMovies">No Movies Found</h1>}
            { showMoviePagination ?  <div className="paginationContainer">
                {pageNumber !== 1 ? <button id="paginationPrev" className="paginationButton" value={pageNumber - 1} onClick={handlePaginationPrev}>Prev</button> : <></>}
                 <a href="#" className={pageNumber === 1 ? "pagination activePage" : "pagination" } id={1} onClick={(handlePageClick)}>1</a>
                 <a href="#" className={pageNumber === 2 ? "pagination activePage" : "pagination" } id={2} onClick={handlePageClick}>2</a>
                 <a href="#" className={pageNumber === 3 ? "pagination activePage" : "pagination" } id={3} onClick={handlePageClick}>3</a>
                 <a href="#" className={pageNumber === 4 ? "pagination activePage" : "pagination" } id={4} onClick={handlePageClick}>4</a>
                 <a href="#" className={pageNumber === 5 ? "pagination activePage" : "pagination" } id={5} onClick={handlePageClick}>5</a>
                 <a href="#" className={pageNumber === 6 ? "pagination activePage" : "pagination" } id={6} onClick={handlePageClick}>6</a>

                 {pageNumber !== 6 ? <button id="paginationNext" className="paginationButton" value={pageNumber + 1} onClick={handlePaginationNext}>Next</button>: <></>}

            </div> : <button className="cancelSearchButton" onClick={()=>{setShowMoviePagination(true)}}>Return to All Movies</button>}
        </div>
        </>
    )
}



export default Movies