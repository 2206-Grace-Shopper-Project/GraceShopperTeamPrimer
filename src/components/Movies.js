import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { createNewCart } from "../api";


const Movies = ({allMovies}) =>{
    const [cssActive, setCSSActive] = useState(null)
    const [activeCart, setActiveCart] = useState(null)
    const cartId = 1

const handleOnclick = (event) =>{
    event.preventDefault()
    console.log(event.target)

}
    return(
        <>
        <h1 id="movieHeader">Welcome, Find a Movie!</h1>

        <div id="movieComponent">

        {allMovies && allMovies.length ? allMovies.map((movie, index)=>{
            let title = movie.title
            let genre = movie.genre
            let year = movie.year
            let plot = movie.plot
            let price = movie.price
            let id = movie.id
            let inventory = movie.inventory
            let className = null
            if(cssActive === movie.id){
                className = 'activeSeeMore'
            }

            return(
            <div key={id} className="movieContainer" >
            <img className="moviePoster" src={movie.poster}/>
              <div className="textContainer">
                <div className="priceText movieText">
                    <span>${price}.99</span>
                    <br></br>
                    {inventory < 10 && inventory > 0  ? <><span className="almostOutOfStock">Only {inventory} left in stock</span><br></br></> : <br></br>}
                    {inventory === 0 ? <><span className="outOfStock">Out of stock</span><br></br></> : <br></br>}
                    <button value={index} className="addToCart" onClick={()=>{
                        console.log(index)
                        if(activeCart){
                            addMovieToCart(id, cartId )
                        }
                        }}><span>Add to Cart</span></button>
                    </div>
              </div>
              <div className="movieInfoContainer"> <NavLink style={{color: 'black'}} to={`/movies/${title}`}>{title}  ({year})</NavLink>
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
        </div>
        </>
    )
}



export default Movies