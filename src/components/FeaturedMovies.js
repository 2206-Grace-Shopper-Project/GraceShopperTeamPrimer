import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedMovies = ({ allMovies, setAllMovies }) => {
  const [movieArrayToDisplay, setMovieArrayToDisplay] = useState([]);
  const [movieList, setMovieList] = useState(allMovies);

  const getRandomMovies = () => {
    if (allMovies.length && allMovies) {
      const returnArray = [];
      for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 251);
        returnArray.push(allMovies[randomNumber]);
      }
      setMovieArrayToDisplay(returnArray);
    }
  };

  useEffect(() => {
    getRandomMovies();
  }, []);

  return (
    <div className="featured-movie">
      {movieArrayToDisplay.length && movieArrayToDisplay ? (
        <>
          <h3 className="featured-movie-title"> Featured Movies!</h3>
          <div key="moviefeature" className="featured-movies">
            {movieArrayToDisplay.map((movie, index) => {
              let poster = movie.poster;
              let linkTitle = movie.title.replace(/\s+/g, "+");

              return (
                <Fragment key={`${index}movie`}>
                  <Link to={`/movies/${linkTitle}`}>
                    <img
                      className="movieFeature"
                      style={{ height: "300px", marginLeft: "auto" }}
                      src={poster}
                    />
                  </Link>
                </Fragment>
              );
            })}{" "}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeaturedMovies;
