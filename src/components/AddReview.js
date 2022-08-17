import React from "react";




// Will Need to Go into API index after Merge
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

async function createReview(token, movieId, userId, review){
    try {
        const response = await fetch(`${BASE}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              movieId,
              userId,
              review
            }),
          });
          const result = await response.json();
          return result;
    } catch (error) {
        console.error;
    }
}


/// end of "Will Need to Go into API index after Merge"


const AddReview = ({ userDataObj, setIsShown, token }) => {
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = userDataObj.id;
    const review = event.target.review.value;

    await createReview(token, movieId, userId, review);

    window.location.reload(true);
  };



return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Review</label>
        <input className="ReviewForm" name="review" placeholder="Tell the nice folks out there what you thought of the film"></input>
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
