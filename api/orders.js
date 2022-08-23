const express = require('express')
const router = express.Router()
const {createOrder, getOrdersByUserId, getAllOrders} = require('../db/models/orders')

// POST create orders
router.post('/', async (req, res, next) => {
    const { cartId, address, email, date, price } = req.body
    try {
        const order = await createOrder({ cartId, address, email, date, price })
       
        res.send(order)
    } catch (error) {
        console.error("error in create orders")
        next(error)
    }
})

// GET user order history
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
        const userOrder = await getOrdersByUserId(userId)
        res.send(userOrder)
    } catch (error) {
        console.error("error with getting order by userId")
        next(error)
    }
})

// GET all orders (admin)
router.get('/:limitNumber/:offsetNumber', async (req, res, next) => {
    let {limitNumber, offsetNumber} = req.params
    limitNumber = Number(limitNumber)
    offsetNumber = Number(offsetNumber)

    try {
        const allOrders = await getAllOrders({limitNumber, offsetNumber})
        res.send(allOrders)
    } catch (error) {
        console.error("error getting all orders")
        next(error)
    }
})

module.exports = router