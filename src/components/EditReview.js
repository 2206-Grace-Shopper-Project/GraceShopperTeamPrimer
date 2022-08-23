import React from "react";
import { editReview } from "../api";
import "./extra.css";

const EditReview = ({
  setIsShown,
  token,
  reviewId,
  reviewText,
  myReviews,
  setMyReviews,
  title
}) => {
  let id = reviewId;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    const result = await editReview(token, id, review);
    result.title = title
    console.log(result, "frank Whalen")
    let updatedReviews = [...myReviews];
    console.log(updatedReviews, "chris walken")
    updatedReviews.forEach((review, index) => {
      if (review.id === reviewId) {
        updatedReviews.splice(index, 1, result);
      }
    });
    console.log(updatedReviews, "tim roth")
    setMyReviews(updatedReviews);
    setIsShown(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="reviewForm"
          defaultValue={reviewText}
          id="newReview"
          required
        />
        <div>
          <button type="submit">Update Your Review</button>
          <button
            onClick={(event) => {
              setIsShown(false);
            }}
          >
            nevermind
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;
