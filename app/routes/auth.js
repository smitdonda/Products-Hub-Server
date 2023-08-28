const express = require('express')
const router = express.Router()
const { signUp, logIn } = require('../controllers/auth')
const trimRequest = require('trim-request')

// Auth routes

// Sign up
router.post('/signup', trimRequest.all, signUp)

// Log in
router.post('/login', trimRequest.all, logIn)

module.exports = router
