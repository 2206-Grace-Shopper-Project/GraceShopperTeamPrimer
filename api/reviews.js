const express = require('express')
const { getReviewsByMovieId } = require('../db/models/reviews')
const router = express.Router()



// POST - create review 
// PATCH - edit review
// GET - movie specific
// GET - user specific
// DELETE - delete review






module.exports = router