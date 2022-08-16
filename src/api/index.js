export const BASE = `https://radiant-citadel-20620.herokuapp.com/api`;

// USER FUNCTIONS

// MOVIE FUNCTIONS

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
    console.error(error)
}
}

// ORDERS FUNCTIONS
export async function getUserOrders(userId) {
  try {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(token, "token");
    const result = await response.json();
    return result;
  } catch (error) {}
}

export async function getAllOrders() {}
