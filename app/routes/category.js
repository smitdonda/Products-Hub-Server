const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { requireAuth } = require('../middleware/requireAuth')
const {
  createCategory,
  getCategory
} = require('../controllers/category/category')

// Category routes

// get all categories
router.get('/', requireAuth, getCategory)

// create a new category
router.post('/', requireAuth, trimRequest.all, createCategory)

module.exports = router
