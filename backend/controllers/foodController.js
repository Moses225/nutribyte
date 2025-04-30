const Food = require('../models/foodModel'); // Assuming you have a Food model
const asyncHandler = require('express-async-handler');

// GET all food entries
const getFoods = asyncHandler(async (req, res) => {
    const foods = await Food.find({ user: req.user.id });
    res.json(foods);
});

// ADD new food entry
const addFood = asyncHandler(async (req, res) => {
    const { name, calories } = req.body;
    if (!name || !calories) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    
    const food = await Food.create({ name, calories, user: req.user.id });
    res.status(201).json(food);
});

// UPDATE food entry
const updateFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (!food) {
        res.status(404);
        throw new Error('Food entry not found');
    }
    
    food.name = req.body.name || food.name;
    food.calories = req.body.calories || food.calories;

    const updatedFood = await food.save();
    res.json(updatedFood);
});

// DELETE food entry
const deleteFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (!food) {
        res.status(404);
        throw new Error('Food entry not found');
    }
    
    await food.remove();
    res.json({ message: 'Food entry deleted' });
});

module.exports = { getFoods, addFood, updateFood, deleteFood };

