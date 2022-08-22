import React from "react";
import { editReview } from "../api";

const EditReview = ({ setIsShown, token, reviewId }) => {
  let id = reviewId;
  console.log(id, "with cameo by penn gilette");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    await editReview(token, id, review);
    setIsShown(false);
  };

  return (
    <div>
      <b>Edit Reviews page</b>
      <form onSubmit={handleSubmit}>
        <label>New Review</label>
        <input id="newReview" required />
        <button type="submit">Update Your Review</button>
      </form>
    </div>
  );
};

export default EditReview;
