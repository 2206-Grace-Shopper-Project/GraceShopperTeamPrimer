import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";





const FeaturedMovies = ({allMovies})=>{
    const [movieArrayToDisplay, setMovieArrayToDisplay] = useState([])
    const [movieList, setMovieList] = useState(allMovies)

    const getRandomMovies = () =>{
        console.log(allMovies)
        const returnArray = []
        for(let i = 0; i <5; i++){
            let randomNumber = Math.floor(Math.random() * 251)
            returnArray.push(allMovies[randomNumber])
        }
        console.log('made it here', returnArray)
       setMovieArrayToDisplay(returnArray)
    }
    useEffect(()=>{
        getRandomMovies()
    },[])


    return(
        <div>
        {movieArrayToDisplay.map((movie)=>{
            console.log(movie)
            let poster = movie.poster
            let linkTitle = movie.title.replace(/\s+/g, '+')

            return(
                <Link to={linkTitle}><img className="movieFeature" src={poster}/></Link>
            )

        })}
        </div>
    )
}



export default FeaturedMovies