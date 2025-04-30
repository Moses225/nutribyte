const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getFoods,
    addFood,
    updateFood,
    deleteFood
} = require('../controllers/foodController');

router.route('/food-entries')
    .get(protect, getFoods)
    .post(protect, addFood);

router.route('/food-entries/:id')
    .put(protect, updateFood)
    .delete(protect, deleteFood);

module.exports = router;



