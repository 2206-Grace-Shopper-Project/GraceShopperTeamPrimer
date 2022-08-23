import React from "react";
import { editReview } from "../api";
import "./extra.css"

const EditReview = ({ setIsShown, token, reviewId, reviewText }) => {
  let id = reviewId;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const review = event.target[0].value;
    await editReview(token, id, review);
    setIsShown(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea className="reviewForm" 
        defaultValue={reviewText}
        id="newReview" required />
        <div>
          <button type="submit">Update Your Review</button>
          <button onClick={(event) => {
              setIsShown(false);
            }}
          >nevermind</button>
        </div>
        
      </form>
    </div>
  );
};

export default EditReview;
