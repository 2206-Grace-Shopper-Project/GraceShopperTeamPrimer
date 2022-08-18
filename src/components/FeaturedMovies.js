import React, { useEffect, useState } from "react";
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
        <div style={{marginLeft:'10%' }}>
                <h3 style={{textAlign: 'center'}}> Check these out!</h3>

        {movieArrayToDisplay.length && movieArrayToDisplay ? movieArrayToDisplay.map((movie)=>{
            console.log(movie)
            console.log(allMovies)
            let poster = movie.poster
            let linkTitle = movie.title.replace(/\s+/g, '+')

            return(
                <>

                <Link to={`/movies/${linkTitle}`}><img className="movieFeature" style={{height: '300px', marginLeft:'auto' }} src={poster}/></Link>
                </>
            )

        }) : <></>}
        </div>
    )
}



export default FeaturedMovies