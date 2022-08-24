import React from "react";

const AddMovie = ({ token, userDataObj }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNewMovie(event, token);
  };

  return (
    <div>
      {userDataObj.id === 5 ||
      userDataObj.id === 8 ||
      userDataObj.id === 9 ||
      userDataObj.id === 11 ? (
        <div className="movieForm">
          <h1>Add New Movie</h1>
          <form onSubmit={handleSubmit} id="newMovieForm">
            <input name="title" placeholder="title"></input>
            <input name="genre" placeholder="genre"></input>
            <input name="year" placeholder="year"></input>
            <input name="rated" placeholder="rated"></input>
            <input name="actors" placeholder="actors"></input>
            <input name="directors" placeholder="directors"></input>
            <input name="plot" placeholder="plot"></input>
            <input name="price" placeholder="price"></input>
            <input name="poster" placeholder="poster"></input>
            <input name="inventory" placeholder="inventory"></input>
            <button id="add-movie-button" type="Submit" onClick={() => {}}>
              Add
            </button>
          </form>
        </div>
      ) : (
        <h1>nice try buddy</h1>
      )}
    </div>
  );
};

export default AddMovie;
