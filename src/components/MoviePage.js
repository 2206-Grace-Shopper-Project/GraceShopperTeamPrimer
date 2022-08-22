import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import AddReview from "./AddReview";
import CartMovies from "./CartMovies";
import ReviewsByMovie from './ReviewsByMovie'


const MoviePage = ({userDataObj, allMovies, setShowButton, showButton, token}) =>{
    const [movieObj, setMovieObj] = useState({})
    const [purchaseAmount, setPurchaseAmount] = useState(0)
    const [isShown, setIsShown] = useState(false)


    const movieTitle = useParams().movieTitle.replace(/\+/g," ")
    const getMovieData = ()=>{
        console.log(allMovies, "phil lamar")
        allMovies.forEach(movie => {
        if(movie.title === movieTitle){
            setMovieObj(movie)
            console.log(movie, 'it works')
            return
        }
    })};


    useEffect(()=>{
        getMovieData()
    },[])


    return(
        <>
        {/* <h1>All about: {movieTitle}</h1> */}
        <div key={movieObj.id} className="singleMovieContainer" >
            <div className="singleTopRowContainer">
            <img className="singleMoviePoster" src={movieObj.poster}/>
              <div className="singleTextContainer">
                <div className="singlePriceText singleMovieText">
                    <p id='moviePrice'>${movieObj.price}.99</p>
                    {/* <br></br> */}
                    <span><CartMovies userDataObj={userDataObj} id={movieObj.id} purchaseAmount={purchaseAmount} realPrice={movieObj.price + .99} title={movieObj.title} setShowButton={setShowButton} showButton={showButton}/></span>
                    <label htmlFor="quantity">Qty: </label>
                    <input type="number" id={movieObj.id} required name="quantity" min="1" max={movieObj.inventory} onBlur={(event)=>event.target.value = ''} onChange={(event)=>{
                        console.log(event.target.value)
                        setPurchaseAmount(Number(event.target.value))
                        if(event.target.value > inventory){
                            alert('You cannot purchase more than what is in stock')
                            setPurchaseAmount(1)
                            event.target.value = 1
                        }}} ></input>
                    {movieObj.inventory < 10 && movieObj.inventory > 0  ? <><span className="almostOutOfStock">Only {movieObj.inventory} left in stock</span></> : <br></br>}
                    {movieObj.inventory === 0 ? <><span className="outOfStock">Out of stock</span><br></br></> : <br></br>}
                    
                   
                        
                        {/* <button onClick={()=>{<CartMovies userDataObj={userDataObj} id={movieObj.id} purchaseAmount={purchaseAmount} realPrice={movieObj.price + .99} title={movieObj.title}/>}}>add to cart</button> */}
                    </div>
              </div>
              </div>
              <div className="singleMovieInfoContainer"> {movieObj.title}
              <div className={`activeSeeMore movieInfo`}>{movieObj.rated} | {movieObj.year} | {movieObj.genre}  
              <br></br> 
              <br></br> 
              <p className='furtherMoviePlot'>{movieObj.plot} </p>
              <br></br> 
              <br></br> 
              <span className='furtherMovieInfo'>Starring: {movieObj.actors} </span>
              <br></br>
              <br></br> 
              <span className='furtherMovieInfo'>Directors: {movieObj.directors} </span>
              <br></br> 
              {/* <span className='furtherMovieInfo'>{movieObj.rated} </span> */}
              </div>
              </div>
              
            </div>
            <div><button onClick={(event) => {setIsShown(true)}}>Review This</button></div>
            <div>
            {isShown? <AddReview userDataObj={userDataObj} setIsShown={setIsShown} token={token} movieId={movieObj.id}/> : null}
            </div>
            <ReviewsByMovie movieId={movieObj.id}/>
        </>
    )
}



export default MoviePage