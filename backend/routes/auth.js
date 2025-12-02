const express = require('express');
const router = express.Router();
const {
    register,
    loginWithPassword,
    requestVerificationCode,
    loginWithCode,
    logout,
    getCurrentUser
} = require('../controllers/authController');
const {
    validateRegister,
    validateLogin,
    validatephone
} = require('../middleware/validation');
const { auth, refreshToken } = require('../middlewares/auth');

// Routes
router.post('/register', validateRegister, register);
router.post('/login/password', validateLogin, loginWithPassword);
router.post('/login/request-code', validatephone, requestVerificationCode);
router.post('/login/verify-code', validatephone, loginWithCode);
router.post('/logout', logout);
router.get('/me', refreshToken, auth, getCurrentUser);

module.exports = router;