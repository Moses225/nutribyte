const mongoose = require("mongoose");

const brandedFoodSchema = new mongoose.Schema({
    brandName: { type: String, required: true },
    foodName: { type: String, required: true },
    servingSize: { type: Number },
    servingSizeUnit: { type: String },
    householdServingFullText: { type: String },
    foodCode: { type: String, required: true },
    nutrients: [
        {
            nutrientName: { type: String },
            value: { type: Number },
            unitName: { type: String },
        },
    ],
});

const BrandedFood = mongoose.model("BrandedFood", brandedFoodSchema);

module.exports = BrandedFood;
