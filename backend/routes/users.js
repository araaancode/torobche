/**
 * Routes مدیریت پروفایل کاربر
 */

const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    changePassword,
    requestAccountDeletion,
    getActivityHistory,
    getAccountStatus
} = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const {
    validateProfileUpdate,
    validatePasswordChange
} = require('../middlewares/validation');

// Routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, validateProfileUpdate, updateProfile);
router.put('/password', auth, validatePasswordChange, changePassword);
router.post('/delete-request', auth, requestAccountDeletion);
router.get('/activities', auth, getActivityHistory);
router.get('/status', auth, getAccountStatus);

module.exports = router;