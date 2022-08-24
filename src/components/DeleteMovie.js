import React, { useEffect, useState } from "react";
import { deleteMovieAPI} from "../api";

const DeleteMovie = ({movieId, movieDeleted, movieObj}) =>{
const [isDeleted, setIsDeleted] = useState(movieDeleted)

useEffect(()=>{
setIsDeleted(movieObj.deleted)
},[movieObj])
    const handleOnclick = async (event)=>{
        event.preventDefault()
        if(isDeleted){
            alert('Movie has already been deleted')
        }else{
            let confirmAction = confirm("Are you sure you want to delete this movie?")
            console.log('I was clicked')
                if(confirmAction){
                await deleteMovieAPI(movieId)
                setIsDeleted(true)
                } 
        }

    }
return(

    <button onClick={handleOnclick}>Admin: Delete Movie</button>
)


}




export default DeleteMovie