const client = require("../client");

const createMovie = async (movieIn) => {
  const {
    title,
    genre,
    year,
    rated,
    actors,
    directors,
    plot,
    price,
    poster,
    inventory,
  } = movieIn;
  try {
    // console.log('I love movies!!!!!!!!!!!????????????')
    // console.log(movieIn, title, genre, 'we made it!!!!!!$$$$')
    const {
      rows: [movie],
    } = await client.query(
      `
        INSERT INTO movies(title, genre, year, rated, actors, directors,  plot, price, poster, inventory)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
        `,
      [
        title,
        genre,
        year,
        rated,
        actors,
        directors,
        plot,
        price,
        poster,
        inventory,
      ]
    );
    // console.log(movie, 'the tables they are empty*******')
    return movie;
  } catch (error) {
    console.error;
    throw error;
  }
};

const getAllMovies = async () => {
  try {
    const { rows: movies } = await client.query(`
        SELECT *
        FROM movies
        ORDER BY id;
        `);
    return movies;
  } catch (error) {
    console.error;
    throw error;
  }
};

const getANumberOfMoviesBySearchCategory = async ({
  searchMethod,
  searchFlow,
  limitNumber,
  offsetNumber,
}) => {
  try {
    console.log(searchMethod, searchFlow, limitNumber, offsetNumber, "!!!!!");

    // const query = `SELECT *
    // FROM movies
    // ORDER BY ${searchMethod} ${searchFlow}
    // LIMIT ${limitNumber} OFFSET ${offsetNumber};`

    // console.log(query)
    const { rows: movies } = await client.query(`
    SELECT *
    FROM movies
    ORDER BY ${searchMethod} ${searchFlow}
    LIMIT ${limitNumber} OFFSET ${offsetNumber};`);

    // console.log(movies, "??????");
    return movies;
  } catch (error) {
    console.error("error in getNumber of movies function");
    throw error;
  }
};

const getMovieById = async (id) => {
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
        SELECT *
        FROM movies
        WHERE id=$1;
        `,
      [id]
    );
    return movie;
  } catch (error) {
    console.error;
    throw error;
  }
};

const getMovieInventory = async (id) => {
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
        SELECT inventory
        FROM movies
        WHERE id=$1;
        `,
      [id]
    );

    return movie;
  } catch (error) {
    console.error;
    throw error;
  }
};

const deleteMovieInDB = async (id) => {
  console.log('in the query??????')
  try {
    const {
      rows: [movie],
    } = await client.query(
      `
        DELETE
        FROM movies
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    return movie;
  } catch (error) {
    console.error("error in delete movies function");
    throw error;
  }
};

const updateMovie = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(",");
  try {
    const {
      rows: [activities],
    } = await client.query(
      `
    UPDATE movies
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return activities;
  } catch (error) {
    console.error;
    throw error;
  }
};

const attachMoviesToCarts = async (carts) => {
  const cartsToReturn = [...carts];
  const setString = carts.map((element, index) => `$${index + 1}`).join(", ");
  const cartIds = carts.map((cart) => cart.id);
  if (!cartIds?.length) return [];
  try {
    const { rows: movies } = await client.query(
      `
      SELECT movies.*, cart_movies.quantity, cart_movies.id AS "cartMoviesId", cart_movies."cartId"
      FROM movies 
      JOIN cart_movies ON cart_movies."movieId" = movies.id
      WHERE cart_movies."cartId" IN (${setString});
    `,
      cartIds
    );

    for (const cart of cartsToReturn) {
      const moviesToAdd = movies.filter((movie) => movie.cartId === cart.id);
      cart.movies = moviesToAdd;
    }
    return cartsToReturn;
  } catch (error) {
    console.error;
    throw error;
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  getMovieInventory,
  updateMovie,
  deleteMovieInDB,
  attachMoviesToCarts,
  getANumberOfMoviesBySearchCategory,
};
