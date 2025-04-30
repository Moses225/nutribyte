const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");
const FoodNutrient = require("./models/foodNutrientModel");
const FoodAttribute = require("./models/foodAttributeModel");
const FoodDescription = require("./models/foodDescriptionModel");
const BrandedFood = require("./models/brandedFoodModel");

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await FoodNutrient.deleteMany();
        await FoodAttribute.deleteMany();
        await FoodDescription.deleteMany();
        await BrandedFood.deleteMany();

        // Load data files
        const foodNutrients = JSON.parse(
            fs.readFileSync(path.join(__dirname, "data/Food_Nutrients.json"), "utf-8")
        );
        const foodAttributes = JSON.parse(
            fs.readFileSync(path.join(__dirname, "data/Food_Attributes.json"), "utf-8")
        );
        const foodDescriptions = JSON.parse(
            fs.readFileSync(path.join(__dirname, "data/Food_descriptions.json"), "utf-8")
        );
        const brandedFoods = JSON.parse(
            fs.readFileSync(path.join(__dirname, "data/Branded_Foods.json"), "utf-8")
        );

        // Insert data into collections
        await FoodNutrient.insertMany(foodNutrients);
        await FoodAttribute.insertMany(foodAttributes);
        await FoodDescription.insertMany(foodDescriptions);
        await BrandedFood.insertMany(brandedFoods);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await FoodNutrient.deleteMany();
        await FoodAttribute.deleteMany();
        await FoodDescription.deleteMany();
        await BrandedFood.deleteMany();
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
