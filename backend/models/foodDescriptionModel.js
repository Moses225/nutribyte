const mongoose = require("mongoose");

const foodDescriptionSchema = new mongoose.Schema({
    foodCode: { type: String, required: true },
    description: { type: String, required: true },
    foodGroup: { type: String },
    publicationDate: { type: Date },
});

const FoodDescription = mongoose.model("FoodDescription", foodDescriptionSchema);

module.exports = FoodDescription;
