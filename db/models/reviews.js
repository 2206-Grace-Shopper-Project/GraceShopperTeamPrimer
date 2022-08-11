const client = require("../client");

// DB FUNCTIONS

async function createReview({ movieId, userId, review }) {
  try {
    const {
      rows: [user_review],
    } = await client.query(
      `
        INSERT INTO reviews("movieId", "userId", review)
        VALUES ($1, $2, $3)
        ON CONFLICT ("movieId", "userId") DO NOTHING
        RETURNING *;
        `,
      [movieId, userId, review]
    );
    return user_review;
  } catch (error) {
    console.error("error in createReview function");
    throw error;
  }
}

async function editReview({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user_review],
    } = await client.query(
      `
          UPDATE reviews
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
      Object.values(fields)
    );

    return user_review;
  } catch (error) {
    console.error("error in editReview function");
    throw error;
  }
}

async function getReviewsByUserId({ userId }) {
  try {
    const { rows: user_reviews } = await client.query(
      `
        SELECT reviews.*
        FROM reviews
        JOIN users ON reviews."userId"=users.id
        JOIN movies ON reviews."movieId"=movies.id
        WHERE "userId"=$1;
        `,
      [userId]
    );

    return user_reviews;
  } catch (error) {
    console.error("error in the getReviewsByUserId function");
    throw error;
  }
}
async function getReviewsByMovieId({ movieId }) {
  try {
    const { rows: user_reviews } = await client.query(
      `
        SELECT reviews.*
        FROM reviews
        JOIN users ON reviews."userId"=users.id
        JOIN movies ON reviews."movieId"=movies.id
        WHERE "movieId"=$1;
        `,
      [movieId]
    );

    return user_reviews;
  } catch (error) {
    console.error("error in the getReviewsByUserId function");
    throw error;
  }
}

async function deleteReview(id) {
  try {
    const { rows } = await client.query(
      `
        DELETE FROM reviews
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("error in deleteReview function");
    throw error;
  }
}

module.exports = {
  createReview,
  editReview,
  getReviewsByMovieId,
  getReviewsByUserId,
  deleteReview,
};
