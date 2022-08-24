import React from "react";
import { deleteMovieAPI} from "../api";

const DeleteMovie = ({movieId, movieDeleted}) =>{


    const handleOnclick = async (event)=>{
        event.preventDefault()
        if(movieDeleted){
            alert('Movie has already been deleted')
        }else{

            console.log('I was clicked')
            await deleteMovieAPI(movieId)
        }

    }
return(

    <button onClick={handleOnclick}>Admin: Delete Movie</button>
)


}




export default DeleteMovie