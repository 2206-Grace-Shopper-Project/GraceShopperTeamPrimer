import React, { useEffect, useState } from "react";

// API Index
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

async function getMovieReviews(movieId) {
  try {
    const response = await fetch(`${BASE}/reviews/movie/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

// End of AP Index

const ReviewsByMovie = ({movieId}) => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const reviewArray = async () => {
    const movieSpecificReview = await getMovieReviews(movieId)
    setMovieReviews(movieSpecificReview);
  };

  useEffect(() => {
    reviewArray();
  }, [movieId]);

  const MappedReviews =
    movieReviews.length > 0
      ? movieReviews.map((review, index) => {
          let reviewId = review.id;
          return (
            <div key={index}>
              <div>
                <b>User:</b> 
                {review.name}
              </div>
              <div>
                <b>Review: </b>
                {review.review}
              </div>
            </div>
          );
        })
      : null;

  return (
    <div>
      <p>Reviews By Movie Page</p>
      <div>{movieReviews.length > 0 ? MappedReviews : null}</div>
    </div>
  );
};

export default ReviewsByMovie;
