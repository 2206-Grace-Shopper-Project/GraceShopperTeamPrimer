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

const ReviewsByMovie = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const reviewArray = async () => {
    setMyReviews(await getMovieReviews(movieId));
  };

  useEffect(() => {
    reviewArray();
  }, []);

  const MappedReviews =
    movieReviews.length > 0
      ? movieReviews.map((review, index) => {
          let reviewId = review.id;
          console.log(review, "here's the review object")
          return (
            <div key={index}>
              <div>
                <b>Film: </b>
                {review.title}
              </div>
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
