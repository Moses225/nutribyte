const mongoose = require("mongoose");

const foodAttributeSchema = new mongoose.Schema({
    foodCode: { type: String, required: true },
    attributeType: { type: String },
    attributeName: { type: String },
    value: { type: String },
});

const FoodAttribute = mongoose.model("FoodAttribute", foodAttributeSchema);

module.exports = FoodAttribute;
