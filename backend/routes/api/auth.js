const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { registerRules, loginRules, validate } = require('../../middleware/validation');
const authMiddleware = require('../../middleware/auth');

router.post('/register', registerRules, validate, authController.registerUser);
router.post('/login', loginRules, validate, authController.loginUser);
router.get('/me', authMiddleware, authController.getMe);


router.get('/verify/:token', authController.verifyEmail);

module.exports = router;