const client = require("./client");

const createMovie = async ({
  title,
  genre,
  year,
  rated,
  plot,
  actors,
  price,
  inventory,
}) => {
  try {
    const {
      rows: [movie],
    } = await client.query(`
        INSERT INTO movies(title, genre, year, rated, plot, actors, price, inventory)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `, [ title,
            genre,
            year,
            rated,
            plot,
            actors,
            price,
            inventory]);
  } catch (error) {
    console.error;
    throw error;
  }
};

const getAllMovies = async () =>{
    try {
        const {rows: movies} = await client.query(`
        SELECT *
        FROM movies
        ORDER BY id;
        `);
        return movies;
    } catch (error) {
        console.error
        throw error
    }
}


const getMovieById = async (id) => {
    try {
        const {rows: [movie]} = await client.query(`
        SELECT *
        FROM movies
        WHERE id=$1
        `, [id])
        return movie
    } catch (error) {
        console.error
        throw error
    }
}


const getMovieInventory = async (id) => {
    try {
        const {rows: [movie]} = await client.query(`
        SELECT inventory
        FROM movies
        WHERE id=$1
        `, [id])

        return movie

    } catch (error) {
        console.error
        throw error
    }
}


const deleteMovie = async (id) => {
    try {
        const {rows: [movie]} = await client.query(`
        DELETE *
        FROM movies
        WHERE id=$1
        `, [id])

        return movie

    } catch (error) {
        console.error
        throw error
    }
}


const updateMovie = async ({id, ...fields}) => {
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
}


const attachMoviesToCarts = async () => {
    try {
    return null
    } catch (error) {
        console.error
    }
}


module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    getMovieInventory,
    deleteMovie,
    updateMovie,
  };