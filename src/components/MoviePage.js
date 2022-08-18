import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import CartMovies from "./CartMovies";

const MoviePage = ({userDataObj, allMovies}) =>{
    const [movieObj, setMovieObj] = useState({})
    const [purchaseAmount, setPurchaseAmount] = useState(0)


    const movieTitle = useParams().movieTitle.replace(/\+/g," ")
    const getMovieData = ()=>{
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
        <h1>All about: {movieTitle}</h1>
        <div key={movieObj.id} className="movieContainer" >
            <div className="topRowContainer">
            <img className="moviePoster" src={movieObj.poster}/>
              <div className="textContainer">
                <div className="priceText movieText">
                    <span>${movieObj.price}.99</span>
                    <br></br>
                    {movieObj.inventory < 10 && movieObj.inventory > 0  ? <><span className="almostOutOfStock">Only {movieObj.inventory} left in stock</span><br></br></> : <br></br>}
                    {movieObj.inventory === 0 ? <><span className="outOfStock">Out of stock</span><br></br></> : <br></br>}
                    <label htmlFor="quantity">Qty: </label>
                    <input type="number" id={movieObj.id} name="quantity" min="1" max={movieObj.inventory} onBlur={(event)=>event.target.value = ''} onChange={(event)=>{
                        console.log(event.target.value)
                        setPurchaseAmount(Number(event.target.value))
                        if(event.target.value > inventory){
                            alert('You cannot purchase more than what is in stock')
                            setPurchaseAmount(1)
                            event.target.value = 1
                        }}} ></input>
                   
                        <span><CartMovies userDataObj={userDataObj} id={movieObj.id} purchaseAmount={purchaseAmount} realPrice={movieObj.price + .99} title={movieObj.title}/></span>
                    </div>
              </div>
              </div>
              <div className="movieInfoContainer"> {movieObj.title}  ({movieObj.year})
              <div className={`activeSeeMore movieInfo`}>{movieObj.genre}  
              <br></br> 
              <br></br> 
              <span className='furtherMovieInfo'>{movieObj.plot} </span>
              <br></br> 
              <br></br> 
              <span className='furtherMovieInfo'>Starring: {movieObj.actors} </span>
              <br></br>
              <br></br> 
              <span className='furtherMovieInfo'>Directors: {movieObj.directors} </span>
              <br></br> 
              <span className='furtherMovieInfo'>{movieObj.rated} </span>
              </div>
              </div>
              
            </div>
        </>
    )
}



export default MoviePage