import React, { useEffect, useState } from "react";
import { getMyReviews } from "../api";
import {EditReview } from "./"


const MyReviews = ({userDataObj, token}) => {
    const[myReviews, setMyReviews] = useState([]);
    const[isShown, setIsShown] = useState(false);

    
    const reviewArray= async() =>{
        const userId = userDataObj.id
        setMyReviews(await getMyReviews(userId, token))
    }

    useEffect(() => {
        reviewArray()
    }, [])
    const MappedReviews =
        myReviews.length > 0
        ? myReviews.map((review, index) => {
            let reviewId = review.id
            return(
                <div key={index}>
                    <div><b>Film: </b>{review.title}</div>
                    <div><b>Your Review: </b>{review.review}</div>
                      <button onClick={(event) => {
                 setIsShown(true)
                 }}
                      >Edit This Review</button>
                      <div>
                      <div>
                {isShown ?
                <EditReview setIsShown={setIsShown} reviewId={reviewId} token={token}/> :null}
              </div>
                      </div>
                </div>
              
            )
            })
        :null;
        

    return (
        <div>
            <p>My Reviews Page</p>
            <div>{myReviews.length > 0 ? MappedReviews : null}</div>

        </div>
    )
}

export default MyReviews