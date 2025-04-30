const mongoose = require("mongoose");

const foodNutrientSchema = new mongoose.Schema({
    foodCode: { type: String, required: true },
    nutrientName: { type: String, required: true },
    value: { type: Number, required: true },
    unitName: { type: String, required: true },
});

const FoodNutrient = mongoose.model("FoodNutrient", foodNutrientSchema);

module.exports = FoodNutrient;
