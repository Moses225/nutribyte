const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    getProfile,
    getGoals,
    addGoal,
    deleteGoal,
    updatePreferences,
    getAnalytics,
    getMealPlan
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/', registerUser); // Register
router.post('/login', loginUser); // Login
router.get('/me', protect, getMe); // Get user info

// Profile & user features
router.get('/profile', protect, getProfile);
router.route('/goals').get(protect, getGoals).post(protect, addGoal);
router.delete('/goals/:id', protect, deleteGoal);
router.put('/preferences', protect, updatePreferences);
router.get('/analytics', protect, getAnalytics);
router.get('/meal-plan', protect, getMealPlan);

module.exports = router;
