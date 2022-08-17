import React, { useState, useEffect } from "react";
import Movies from "./Movies";

// NEED TO IMPORT FUNCTIONS HERE:
// import { } from "../api";


// Will Need to Go into API index after Merge
const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

async function createReview(movieId, userId, review){
    try {
        console.log(movieId, userId, review)
        const response = await fetch(`${BASE}`)
    } catch (error) {
        console.log(error)
    }

}



/// end of Will Need to Go into API index after Merge 
const AddReview = ({ setIsShown }) => {
  console.log(movieData.id, "Here's a movieId");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const routineId = routineData.id;
    const activityId = Number(selectedActivity);
    const count = event.target.count.value;
    const duration = event.target.duration.value;

    await attachActivityToRoutine(routineId, activityId, count, duration);

    window.location.reload(true);
  };

  useEffect(() => {
    async function helpGetAllActivities() {
      const activities = await getAllActivities();
      setAllActivities(activities);
    }
    helpGetAllActivities();
  }, []);

  console.log(selectedActivity, "hello hello");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Review</label>
        <input className="ReviewForm" name="review" placeholder="Tell everyone what you thought of the film"></input>
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
