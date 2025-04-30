const express = require('express');
const router = express.Router();
const { generateMealPlan } = require('../controllers/mealPlannerController'); // Import the controller function
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes

// Route to generate meal plan
router.post('/', protect, generateMealPlan);

module.exports = router;
