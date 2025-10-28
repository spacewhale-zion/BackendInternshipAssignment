const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { registerRules, loginRules, validate } = require('../../middleware/validation');
const authMiddleware = require('../../middleware/auth');

// @route   POST api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerRules, validate, authController.registerUser);

// @route   POST api/v1/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginRules, validate, authController.loginUser);

// @route   GET api/v1/auth/me
// @desc    Get logged in user data
// @access  Private
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;