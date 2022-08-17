const client = require('../client');

async function createOrder({ cartId, address, email, quantity, date, price }) {
    try {
        const { rows: [order] } = await client.query(`
        INSERT INTO orders("cartId", address, email, quantity, date, price)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [cartId, address, email, quantity, date, price])

        return order
    } catch (error){
        console.error("Error creating new order")
        throw error
    }
}

async function getOrdersByUserId(userId) {
    try {
        const {rows: orders} = await client.query(`
        SELECT orders.*, cart.*
        FROM orders
        JOIN cart ON orders."cartId" = cart.id
        WHERE "isPurchased" = true 
        AND cart."userId" = $1;
        `, [userId])

        return orders
    } catch (error){
        console.error("Error getting orders by userId")
        throw error 
    }
}

async function getAllOrders() {
    try {
        const {rows: orders} = await client.query(`
        SELECT orders.*, users.name
        FROM orders
        JOIN cart ON orders."cartId" = cart.id
        JOIN users ON cart."userId" = users.id;
        `)
        return orders
    } catch (error) {
        console.error("Error getting all orders")
        throw error
    } 
}

module.exports = {
    createOrder,
    getOrdersByUserId,
    getAllOrders,
};