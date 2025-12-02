/**
 * Routes مدیریت ادمین
 */

const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deactivateUser,
    activateUser,
    getSystemStats,
    deleteUser
} = require('../controllers/adminController');
const { adminAuth } = require('../middlewares/auth');
const { validation } = require('../middlewares/validation');

// Routes
router.get('/users', adminAuth, getAllUsers);
router.get('/users/:id', adminAuth, getUserById);
router.put('/users/:id/role', adminAuth, updateUserRole);
router.put('/users/:id/deactivate', adminAuth, deactivateUser);
router.put('/users/:id/activate', adminAuth, activateUser);
router.delete('/users/:id', adminAuth, deleteUser);
router.get('/stats', adminAuth, getSystemStats);

module.exports = router;