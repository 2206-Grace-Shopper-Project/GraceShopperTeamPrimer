const client = require('../client')

async function createCart (userId) {
try {
    const {rows: [cart] } = await client.query(`
    INSERT INTO cart("userId")
    VALUES ($1)
    RETURNING *;
    `, [userId]
    );
    return cart 
} catch (error) {
    console.error(error)
    throw error;
}
}


async function getCartById (id) {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT * 
        FROM cart
        WHERE id=$1;
        `, [id]
        );
        return cart
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function getCartByUser (userId) {
  try {
    const { rows: [cart] } = await client.query(`
    SELECT *
    FROM cart
    JOIN user on cart."userId"=user.id
    WHERE "isPurchased='false' AND "userId"=$1;
    `, [userId])


 
    return cart
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function deleteCart (id) {
try {
    await client.query(`
    DELETE FROM cart
    WHERE id=$1;
    `)
} catch (error) {
    console.error(error)
}   throw error;
}




module.exports = {
    createCart,
    getCartById,
    getCartByUser,
    deleteCart,
}