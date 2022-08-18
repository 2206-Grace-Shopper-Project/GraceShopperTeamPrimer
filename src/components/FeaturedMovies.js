import React from "react";
import { Link } from "react-router-dom";





const FeaturedMovies = ()=>{



    return(

        <aside className="test"><Link to='#' className="anchor" onClick={()=>{console.log('work')}}> Filter↓</Link></aside>
    )
}



export default FeaturedMovies