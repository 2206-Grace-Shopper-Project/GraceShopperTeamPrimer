import React, { useEffect, useState } from "react";
import { getMovieReviews } from "../api";
import "./extra.css";

const ReviewsByMovie = ({
  movieId,
  setMovieReviews,
  movieReviews,
  movieObj,
}) => {
  const [isShown, setIsShown] = useState(false);

  const reviewArray = async () => {
    const movieSpecificReview = await getMovieReviews(movieId);
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
            <div className="individualReviews" key={index}>
              <div className="userReview">
                <b>User: </b>
                {review.name}
              </div>
              <div >
                <b>Review: </b>
                {review.review}
              </div>
            </div>
          );
        })
      : null;

  return (
    <div className="componentBasics">
      <p className="componentHeader">
        reviews of {movieObj.title}
      </p>
      <div>{movieReviews.length > 0 ? MappedReviews : <div className="individualReviews">Looks like no one has reviewed {movieObj.title} yet</div>}</div>
    </div>
  );
};

export default ReviewsByMovie;
