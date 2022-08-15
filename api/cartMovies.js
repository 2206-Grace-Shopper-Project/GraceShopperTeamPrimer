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



module.exports = router;
