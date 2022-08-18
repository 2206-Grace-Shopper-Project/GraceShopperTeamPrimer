import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";





const FeaturedMovies = ({allMovies})=>{
    const [movieArrayToDisplay, setMovieArrayToDisplay] = useState([])

    const getRandomMovies = () =>{
        const returnArray = []
        for(i = 0; i <5; i++){
            let randomNumber = Math.floor(Math.random() * 251)
            returnArray.push(allMovies[randomNumber])
        }
       setMovieArrayToDisplay(returnArray)
    }
    useEffect(()=>{
        getRandomMovies()
    },[])


    return(

        <aside className="test"><Link to='#' className="anchor" onClick={()=>{console.log('work')}}> Filter↓</Link></aside>
    )
}



export default FeaturedMovies