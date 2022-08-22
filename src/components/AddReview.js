import React from "react";
import { createReview } from "../api";

const AddReview = ({ userDataObj, setIsShown, token, movieId }) => {
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const review = event.target.review.value;
    setIsShown(false);
    const result = await createReview(token, movieId, userId, review);
    console.log(result);

    // window.location.reload(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Review</label>
        <input
          className="ReviewForm"
          name="review"
          placeholder="Tell the nice folks out there what you thought of the film"
        ></input>
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
