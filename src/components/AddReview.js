import React from "react";
import { createReview } from "../api";

const AddReview = ({
  userDataObj,
  setIsShown,
  token,
  movieId,
  setMovieReviews,
  movieReviews,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const review = event.target.review.value;
    setIsShown(false);
    const result = await createReview(token, movieId, userId, review);
    if (result.error === "PreviouslyReviewedError") {
      alert(`you've already reviewed this movie!`);
      return;
    }
    result.name = userDataObj.name;
    setMovieReviews([...movieReviews, result]);
  };

  return (
    <div className="addreview">
      <form onSubmit={handleSubmit}>
        <textarea
          className="reviewForm"
          name="review"
          placeholder="Tell the nice folks out there what you thought of the film"
        ></textarea>
        <div>
          <button type="submit">Review it!</button>
          <button
            onClick={(event) => {
              setIsShown(false);
            }}
          >
            Nevermind
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
