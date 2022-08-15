const express = require("express");
const router = express.Router();
const {
  getMovieById,
  getReviewsByMovieId,
  editReview,
  getReviewByReviewId,
  createReview,
  getUserById,
  getReviewsByUserId,
} = require("../db");
const { requireUser } = require("./utils");

// POST - create review
router.post("/", requireUser, async (req, res, next) => {
  const { movieId, review } = req.body;
  const userId = req.user.id;
  try {
    const movieCheck = await getReviewsByMovieId({ movieId });
    movieCheck.forEach((userIdEntry) => {
      if (userIdEntry.userId === userId) {
        next({
          name: "Previously Reviewed Error",
          message: "It appears you have already left a review for this movie",
          error: "PreviouslyReviewedError",
        });
      }
    });
    const newReview = await createReview({ movieId, userId, review });
    res.send(newReview);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// PATCH - edit review
router.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    const reviewExists = await getReviewByReviewId(id);
    if (!reviewExists) {
      next({
        name: "ReviewDoesNotExist",
        message: "You are trying to edit a review that does not exist",
        error: "ExtinctReviewError",
      });
    }
    const updatedReview = await editReview({ id, review });
    res.send(updatedReview);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// GET - movie specific
router.get("/movie/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movieExists = await getMovieById(movieId);
    if (!movieExists) {
      next({
        name: "MovieDoesNotExist",
        message:
          "You are trying to see reviews for a movie that does not exist",
        error: "ExtinctMovieError",
      });
    }
    const reviewsByMovie = await getReviewsByMovieId({ movieId });
    res.send(reviewsByMovie);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});
// GET - user specific
router.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userExists = await getUserById(userId);
    if (!userExists) {
      next({
        name: "UserDoesNotExist",
        message: "You are trying view a user who does not exist",
        error: "ExtinctUserError",
      });
    }
    const reviewsByUser = await getReviewsByUserId({ userId });
    res.send(reviewsByUser);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

// DELETE - delete review

router.delete("/delete/:id", requireUser, async (req, res, next) => {
  const id = req.params.id;
  try {
    const targetReview = await getReviewByReviewId(id);
    if (req.user.id !== targetReview.userId) {
      next({
        name: "UnownedReviewError",
        message: "You cannot delete a review that is not yours",
        error: "UnownedReviewError",
      });
    }

    const deletedReview = await deletedReview(id);
    res.send(deletedReview);
  } catch ({ name, message, error }) {
    next({ name, message, error });
  }
});

module.exports = router;
