export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

// USER FUNCTIONS

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
// MOVIE FUNCTIONS







// CART FUNCTIONS

export const createNewCart = async (userId) => {
  try {
    console.log(userId,"this is user id in api")
    const response = await fetch(`${BASE}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    console.log(response)
    const result = await response.json();
    console.log(result, "this is result from api create cart");
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
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const hideCart = async () => {
    try {
        const response = await fetch(`${BASE}/cart/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          return result
    } catch (error) {
        
    }
}




// ORDERS FUNCTIONS

export async function getUserOrders(userId, token) {
  try {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result, "result from getUserOrders");
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders(token) {
  try {
    const response = await fetch(`${BASE}/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result, "result from getAllOrders");
  } catch (error) {
    throw error;
  }
}
