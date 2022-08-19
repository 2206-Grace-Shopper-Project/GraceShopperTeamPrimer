export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

// USER FUNCTIONS

export async function getMyAddresses(id){
  try {
      const response = await fetch(`${BASE}/users/${id}`, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error
  }

}

export async function NewAddress(token, userId, address) {
  
  try {
      const response = await fetch (`${BASE}/users/address/${userId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
              address
          })
      });
      const result = await response.json();
      console.log(result, "and wendell pierce as agent richard gill")
      return result;
  } catch (error) {
      console.error
  }
}

export async function createUser(name, email, password) {
  try {
    console.log(email, name, password);
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async (id, token) => {
  const response = await fetch(`${BASE}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result, "result from getUser");
  return result;
};

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export async function editReview(token, id, review) {
  try {
    const response = await fetch(`${BASE}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        review,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

//Admin Level Function

export async function addNewMovie(event, token){
  const title = event.target.title.value
  const genre = event.target.genre.value
  const year = event.target.year.value
  const rated = event.target.rated.value
  const actors = event.target.actors.value
  const directors = event.target.directors.value
  const plot = event.target.plot.value
  const price = event.target.price.value
  const poster = event.target.poster.value
  const inventory = event.target.inventory.value
  try {
      const response = await fetch(`${BASE}/movies`,
      {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
              title,
              genre,
              year,
              rated,
              actors,
              directors,
              plot,
              price,
              poster,
              inventory
          }),
     })
      const result = await response.json()
      console.log(result, 'result ')
      return result
  } catch(error) {
      throw error
  }
}


export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "result from getAllUsers");
    return result;
  } catch (error) {
    throw error;
  }
}
// MOVIE FUNCTIONS

export async function getAllMovies() {
  try {
    const response = await fetch(`${BASE}/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createMovie(movieObj) {
  try {
    const response = await fetch(`${BASE}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function editMovieAPI(movieObj) {
  const id = movieObj.id;
  try {
    const response = await fetch(`${BASE}/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMovieAPI(id) {
  try {
    const response = await fetch(`${BASE}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function specificMovieList(
  searchMethod,
  searchFlow,
  limitNumber,
  offsetNumber
) {
  try {
    const response = await fetch(
      `${BASE}/movies/${searchMethod}/${searchFlow}/${limitNumber}/${offsetNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

// CART FUNCTIONS

export const createNewCart = async (userId) => {
  try {
    const response = await fetch(`${BASE}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getEachCartByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE}/carts/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "this is rsult from api");
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const hideCart = async (id) => {
  try {
    console.log(id, "id from ");
    const response = await fetch(`${BASE}/carts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

//CartMovie Functions

export const addMovieToCart = async (cartId, movieId, quantity) => {
  try {
    const response = await fetch(`${BASE}/cart_movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        movieId,
        quantity,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getCartMoviesById = async (id) => {
  try {
    const response = await fetch(`${BASE}/cart_movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateMovieQuantity = async (cartId, movieId, quantity, id) => {
  try {
    const response = await fetch(`${BASE}/cart_movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        movieId,
        quantity,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const removeMovieFromACart = async (id) => {
  try {
    const response = await fetch(`${BASE}/cart_movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

// ORDERS FUNCTIONS

export async function getAllOrders() {
  try {
    const response = await fetch(`${BASE}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result, "result from getAllOrders");
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getUserOrders(userId) {
  try {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result, "result from getUserOrders");
    return result;
  } catch (error) {
    throw error;
  }
}

//Reviews Functions

export async function getMyReviews(userId, token) {
  try {
    const response = await fetch(`${BASE}/reviews/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export async function createReview(token, movieId, userId, review) {
  try {
    const response = await fetch(`${BASE}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId,
        userId,
        review,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await fetch(`${BASE}/reviews/movie/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error;
  }
}