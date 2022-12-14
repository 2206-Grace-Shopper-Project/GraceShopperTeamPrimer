import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import AddReview from "./AddReview";
import CartMovies from "./CartMovies";
import Loading from "./Loading";
import ReviewsByMovie from "./ReviewsByMovie";
import EditMovie from "./EditMovie";
import DeleteMovie from "./DeleteMovie";

const MoviePage = ({
  userDataObj,
  allMovies,
  setShowButton,
  showButton,
  token,
  guestUserObj,
  setGuestUserObj,
}) => {
  const [movieObj, setMovieObj] = useState({});
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [isShown, setIsShown] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);
  const [editMovieEntry, setEditMovieEntry] = useState(false);

  const navigate = useNavigate();

  const movieTitle = useParams().movieTitle.replace(/\+/g, " ");
  const getMovieData = () => {
    allMovies.forEach((movie) => {
      if (movie.title === movieTitle) {
        setMovieObj(movie);
        if (
          userDataObj?.id === 5 ||
          userDataObj?.id === 8 ||
          userDataObj?.id === 9 ||
          userDataObj?.id === 11
        ) {
          return;
        }
        if (movie.deleted) {
          navigate("/MovieDoesNotExist", { replace: true });
        }
        return;
      }
    });
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      <div key={movieObj.id} className="singleMovieContainer">
        <div className="singleTopRowContainer">
          <img className="singleMoviePoster" src={movieObj.poster} />
          <div className="singleTextContainer">
            <div className="singlePriceText singleMovieText">
              <p id="moviePrice">${movieObj.price}.99</p>
              <span>
                <CartMovies
                  userDataObj={userDataObj}
                  id={movieObj.id}
                  purchaseAmount={purchaseAmount}
                  realPrice={movieObj.price + 0.99}
                  title={movieObj.title}
                  setShowButton={setShowButton}
                  showButton={showButton}
                  guestUserObj={guestUserObj}
                  setGuestUserObj={setGuestUserObj}
                />
              </span>
              <label htmlFor="quantity">Qty: </label>
              <input
                type="number"
                id={movieObj.id}
                required
                name="quantity"
                min="1"
                max={movieObj.inventory}
                onBlur={(event) => (event.target.value = 1)}
                onChange={(event) => {
                  setPurchaseAmount(Number(event.target.value));
                  if (event.target.value > movieObj.inventory) {
                    alert("You cannot purchase more than what is in stock");
                    setPurchaseAmount(1);
                    event.target.value = 1;
                  }
                }}
              ></input>
              {movieObj.inventory < 10 && movieObj.inventory > 0 ? (
                <>
                  <span className="almostOutOfStock">
                    Only {movieObj.inventory} left in stock
                  </span>
                </>
              ) : (
                <br></br>
              )}
              {movieObj.inventory === 0 ? (
                <>
                  <span className="outOfStock">Out of stock</span>
                  <br></br>
                </>
              ) : (
                <br></br>
              )}
            </div>
          </div>
        </div>
        <div className="singleMovieInfoContainer">
          {" "}
          {movieObj.title}
          <div className={`activeSeeMore movieInfo`}>
            {movieObj.rated} | {movieObj.year} | {movieObj.genre}
            <br></br>
            <br></br>
            <p className="furtherMoviePlot">{movieObj.plot} </p>
            <br></br>
            <br></br>
            <span className="furtherMovieInfo">
              Starring: {movieObj.actors}{" "}
            </span>
            <br></br>
            <br></br>
            <span className="furtherMovieInfo">
              Directors: {movieObj.directors}{" "}
            </span>
            <br></br>
          </div>
        </div>
      </div>
      {userDataObj ? (
        <div className="reviewButton">
          <button
            onClick={(event) => {
              setIsShown(true);
            }}
          >
            Add Review
          </button>
        </div>
      ) : (
        <></>
      )}
      <div>
        {isShown ? (
          <AddReview
            userDataObj={userDataObj}
            setIsShown={setIsShown}
            token={token}
            movieId={movieObj.id}
            movieReviews={movieReviews}
            setMovieReviews={setMovieReviews}
          />
        ) : null}
      </div>

      {movieObj.id ? (
        <ReviewsByMovie
          movieId={movieObj.id}
          movieReviews={movieReviews}
          setMovieReviews={setMovieReviews}
          movieObj={movieObj}
        />
      ) : (
        <Loading />
      )}
      {(movieObj.id && userDataObj?.id === 5) ||
      userDataObj?.id === 8 ||
      userDataObj?.id === 9 ||
      userDataObj?.id === 11 ? (
        <div className="moviePageButton">
          {editMovieEntry ? (
            <EditMovie
              setEditMovieEntry={setEditMovieEntry}
              movieObj={movieObj}
              setMovieObj={setMovieObj}
            />
          ) : (
            <button onClick={() => setEditMovieEntry(true)}>
              Admin: Edit Movie
            </button>
          )}
          <DeleteMovie
            movieId={movieObj.id}
            movieDeleted={movieObj.deleted}
            movieObj={movieObj}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MoviePage;
