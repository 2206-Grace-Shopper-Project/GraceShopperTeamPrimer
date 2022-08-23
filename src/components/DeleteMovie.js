import React from "react";
import { deleteMovieAPI} from "../api";

const DeleteMovie = ({movieId}) =>{


    const handleOnclick = async (event)=>{
        event.preventDefault()
        console.log('I was clicked')
        // await deleteMovieAPI(movieId)

    }
return(

    <button onClick={handleOnclick}>Admin: Delete Movie</button>
)


}




export default DeleteMovie