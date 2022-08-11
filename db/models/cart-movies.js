const client = require("../client");

async function addMovietoCart({ cartId, movieId, quantity }) {
  try {
    const {
      rows: [cartMovies],
    } = await client.query(
      `
    INSERT INTO cart_movies("cartId", "movieId", quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT ("cartId", "movieId") DO NOTHING
    RETURNING *; 
    `,
      [cartId, movieId, quantity]
    );
    return cartMovies;
  } catch (error) {
    console.error(error);
  }
  throw error;
}

async function getCartMovieById(id) {
  try {
    const {
      rows: [cartMovies],
    } = await client.query(
      `
        SELECT *
        FROM cart_movies
        WHERE id=$1
        RETURNING *
        `,
      [id]
    );
    return cartMovies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateQuantity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, idx) => `${key}=$${idx + 1}`)
    .join(",");
  if (!setString) {
    return;
  }
  try {
    const {
      rows: [newQuantity],
    } = await client.query(
      `
    UPDATE cart_movies
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return newQuantity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteMovie(id) {
  try {
    const {
      rows: [deletedMovie],
    } = await client.query(
      `
        DELETE FROM cart_movies
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return deletedMovie;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  addMovietoCart,
  updateQuantity,
  deleteMovie,
};
