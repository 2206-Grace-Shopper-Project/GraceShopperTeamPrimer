const { response } = require("express");
const express = require("express");
const router = express.Router();

const {
  addMovietoCart,
  updateQuantity,
  getCartMovieById,
  deleteMovie,
} = require("../db/models/cart-movies");

//add movie to cart
router.post("/", async (req, res, next) => {
  try {
    const { cartId, movieId, quantity } = req.body;

    const response = await addMovietoCart({ cartId, movieId, quantity });

    res.send(response);
  } catch (error) {
    next(error);
  }
});

//id is in reference to cart_movieId>> function to grab cart with movies in it...
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getCartMovieById(id);

    res.send(response);
  } catch (error) {
    next(error);
  }
});

//updates quantity for movies in cart!

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cartId, movieId, quantity } = req.body;
    console.log(quantity, "quantity");
    const updateObj = {};
    const update = await getCartMovieById(id);
    console.log(update, "update!!!");
    if (id) {
      updateObj.id = update.id;
    }
    if (cartId) {
      updateObj.cartId = update.cartId;
    }
    if (movieId) {
      updateObj.movieId = update.movieId;
    }
    if (quantity) {
      updateObj.quantity = quantity;
    }
    console.log(updateObj, "updated Object");
    if (update) {
      const response = await updateQuantity(updateObj);
      console.log(response, "this is response");
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

//Deletes a movie from catr movies table 
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const canDelete = await getCartMovieById(id);

    if (canDelete) {
      const response = await deleteMovie(id);
      res.send(response);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
