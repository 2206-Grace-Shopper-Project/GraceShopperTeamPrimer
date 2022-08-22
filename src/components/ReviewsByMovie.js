import React, { useEffect, useState } from "react";
import { getMovieReviews } from "../api";

const ReviewsByMovie = ({ movieId, setMovieReviews, movieReviews }) => {
  const [isShown, setIsShown] = useState(false);

  const reviewArray = async () => {
    const movieSpecificReview = await getMovieReviews(movieId);
    setMovieReviews(movieSpecificReview);
  };
  console.log(movieReviews, "harvey kietel")

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
