const client = require('../client')
const {attachMoviesToCarts} = require('./movies')


async function createCart ({userId}) {
try {
    console.log(userId)
    const {rows: [cart] } = await client.query(`
    INSERT INTO cart("userId")
    VALUES ($1)
    RETURNING *;
    `, [userId]
    );
    
    return cart 
} catch (error) {
    console.error("error createCart")
    throw error;
}
}


async function getCartById (id) {
    try {
        const { rows: cart } = await client.query(`
        SELECT * 
        FROM cart
        WHERE id=$1;
        `, [id]
        );
        return attachMoviesToCarts(cart)
    } catch (error) {
        console.error("error getting cart by id")
        throw error;
    }
}

async function getCartByUser (userId) {
  try {   
    console.log(userId,"userID from db")

    const { rows: cart } = await client.query(`
    SELECT cart.*, users.name
    FROM cart
    JOIN users on cart."userId"=users.id
    WHERE "isPurchased"='false' AND "userId"=$1;
    `, [userId])


 
    return attachMoviesToCarts(cart)
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function deleteCart (id) {
try {
   const {rows: [cart]} = await client.query(`
    UPDATE cart
    SET "isPurchased"='true'
    WHERE id=$1
    RETURNING *;`, [id])
    return cart
} catch (error) {
    console.error('delete cart is not working')
}   throw error;
}




module.exports = {
    createCart,
    getCartById,
    getCartByUser,
    deleteCart,
}