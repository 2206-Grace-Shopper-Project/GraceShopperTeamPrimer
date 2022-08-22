import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api";




const FeaturedMovies = ({allMovies, setAllMovies})=>{
    const [movieArrayToDisplay, setMovieArrayToDisplay] = useState([])
    const [movieList, setMovieList] = useState(allMovies)

    const getRandomMovies = () =>{
        console.log(allMovies)
        if(allMovies.length && allMovies){
            const returnArray = []
            for(let i = 0; i <5; i++){
                let randomNumber = Math.floor(Math.random() * 251)
                returnArray.push(allMovies[randomNumber])
            }
            console.log('made it here', returnArray)
           setMovieArrayToDisplay(returnArray)
        }
       
    }

    // const fetchMovies = async ()=>{
    //     const movieList = await getAllMovies()
    //     console.log('main all fetch')
    //     console.log(movieList, 'what happened')
    //     setAllMovies(movieList)
    //   } 
    useEffect(()=>{
        // fetchMovies()
        getRandomMovies()
    },[])


    return(
        // <div style={{marginLeft:'10%' }}>
        <div className='featured-movie'>
            {/* <h3 style={{textAlign: 'center'}}> Featured Movies!</h3> */}

        {movieArrayToDisplay.length && movieArrayToDisplay ? 
        <>
        <h3 className='featured-movie-title'> Featured Movies!</h3>
        <div key='moviefeature' className='featured-movies'>
        
        {movieArrayToDisplay.map((movie, index)=>{
            // console.log(movie)
            // console.log(allMovies)
            let poster = movie.poster
            let linkTitle = movie.title.replace(/\s+/g, '+')
       
            return(
                <Fragment key={`${index}movie`}>
                
                <Link to={`/movies/${linkTitle}`}><img className="movieFeature" style={{height: '300px', marginLeft:'auto' }} src={poster}/></Link>
             
                </Fragment>
            )

        })} </div></>: <></>} 
        </div>
    )
}



export default FeaturedMovies