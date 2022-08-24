const express = require("express");
const router = express.Router();
const { getAllMovies, createMovie, updateMovie,  getMovieById, getANumberOfMoviesBySearchCategory, deleteMovieInDB } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const response = await getAllMovies();

    res.send(response);
  } catch (error) {
    next({ name: "GET route Error", message: "Error from GET route", error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await createMovie(req.body);
    res.send(response);
  } catch (error) {
    next({
      message: "Error creating movie",
      name: "CreatingMovieError",
      error,
    });
  }
});

router.patch("/:movieId", async (req, res, next) => {
  try {
    const id  = req.params.movieId;
    req.body.id = id;
    if(!(await getMovieById(id))){
        next({
            name: "MovieNotFoundError",
            message: `Movie ${id} not found`,
            error: "Error!",
          });
    }
    const response = await updateMovie(req.body);
    res.send(response)
  } catch (error) {
    next({ message: "Error updating movie!", name: "UpdateError", error });
  }
});

router.patch("/inventory/:movieId", async (req, res, next) => {
  try {
    const id  = req.params.movieId;
    const {newInventory} = req.body
    if(!(await getMovieById(id))){
        next({
            name: "MovieNotFoundError",
            message: `Movie ${id} not found`,
            error: "Error!",
          });
    }
    const response = await updateInventoryCount(id, newInventory );
    res.send(response)
  } catch (error) {
    next({ message: "Error updating movie!", name: "UpdateError", error });
  }
});

router.patch('/delete/:movieId', async (req, res, next) =>{
    try {
        const id  = Number(req.params.movieId)
        console.log(id, '####')
        const movieCheck = await getMovieById(id)
        if(!movieCheck){
          console.log('in the if statemnt')
        next({
            name: "MovieNotFoundError",
            message: `Movie ${id} not found`,
            error: "Error!",
          });
    }else{
    const response = await deleteMovieInDB(id)
    console.log(response, 'what we got from query')
    res.send(response)}
} catch (error) {
    next(error)
}
})

router.get('/:searchMethod/:searchFlow/:limitNumber/:offsetNumber', async(req, res, next) =>{
    let {searchMethod, searchFlow, limitNumber, offsetNumber} = req.params
    limitNumber = Number(limitNumber)
    offsetNumber = Number(offsetNumber)

    try {
        if(!searchMethod === 'title' || !searchMethod === 'price' || !searchMethod === 'id'){
            next({
                searchmessage: 'Not a valid search parameter',
                error: 'InvalidSearch!'
            })
        }
        if(!searchFlow === 'ASC' || !searchMethod === 'DESC'){
            next({
                searchmessage: 'Not a valid search parameter',
                error: 'InvalidSearch!'
            })
        }

        const response = await getANumberOfMoviesBySearchCategory({searchMethod, searchFlow, limitNumber, offsetNumber})
        res.send(response)
    } catch (error) {
        next({message: `Error in searching by method or flow`,
        name: 'InvalidSearch!',
        error})
    }
})

// get- list of all movies (masterlist)
// get- list of movies based on different search params
// post- create movie
// patch- update movie
// delete- delete movie

module.exports = router;
