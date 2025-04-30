import React, { useState } from 'react';

// More realistic mock data
const initialMealPlan = {
  breakfast: {
    name: 'Oatmeal with Berries',
    calories: 320,
    protein: 8,
    carbs: 54,
    fat: 6,
    image: '/api/placeholder/400/300'
  },
  lunch: {
    name: 'Chicken Salad Sandwich',
    calories: 450,
    protein: 28,
    carbs: 42,
    fat: 18,
    image: '/api/placeholder/400/300'
  },
  dinner: {
    name: 'Salmon with Roasted Vegetables',
    calories: 520,
    protein: 32,
    carbs: 30,
    fat: 28,
    image: '/api/placeholder/400/300'
  },
  snack: {
    name: 'Greek Yogurt with Honey',
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 3,
    image: '/api/placeholder/400/300'
  }
};

// Diet type descriptions for tooltips
const dietDescriptions = {
  balanced: "A balanced diet with moderate amounts of protein, carbs, and fats.",
  'low-carb': "Reduced carbohydrates with higher protein and fat content.",
  'low-fat': "Limited fat content with higher proportion of carbs and protein.",
  'high-protein': "Emphasizes protein-rich foods with moderate carbs and fats."
};

const MealPlanner = () => {
  const [dietType, setDietType] = useState('balanced');
  const [targetCalories, setTargetCalories] = useState(2000);
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('breakfast');
  const [showTooltip, setShowTooltip] = useState(false);
  
  const totalDailyCalories = Object.values(mealPlan).reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = Object.values(mealPlan).reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = Object.values(mealPlan).reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = Object.values(mealPlan).reduce((sum, meal) => sum + meal.fat, 0);
  
  const calorieProgress = Math.min(Math.round((totalDailyCalories / targetCalories) * 100), 100);

  const handleGenerate = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate new meal plan with some randomization to demonstrate change
      const newMealPlan = {
        breakfast: {
          ...initialMealPlan.breakfast,
          calories: Math.floor(300 + Math.random() * 100),
          protein: Math.floor(6 + Math.random() * 6),
          carbs: Math.floor(40 + Math.random() * 20),
          fat: Math.floor(4 + Math.random() * 6),
        },
        lunch: {
          ...initialMealPlan.lunch,
          calories: Math.floor(400 + Math.random() * 150),
          protein: Math.floor(25 + Math.random() * 10),
          carbs: Math.floor(35 + Math.random() * 15),
          fat: Math.floor(15 + Math.random() * 10),
        },
        dinner: {
          ...initialMealPlan.dinner,
          calories: Math.floor(450 + Math.random() * 150),
          protein: Math.floor(28 + Math.random() * 10),
          carbs: Math.floor(25 + Math.random() * 15),
          fat: Math.floor(20 + Math.random() * 12),
        },
        snack: {
          ...initialMealPlan.snack,
          calories: Math.floor(150 + Math.random() * 80),
          protein: Math.floor(12 + Math.random() * 6),
          carbs: Math.floor(15 + Math.random() * 10),
          fat: Math.floor(2 + Math.random() * 4),
        }
      };
      
      // Update different meal names based on diet type
      if (dietType === 'low-carb') {
        newMealPlan.breakfast.name = 'Scrambled Eggs with Avocado';
        newMealPlan.lunch.name = 'Tuna Salad Lettuce Wraps';
        newMealPlan.dinner.name = 'Grilled Steak with Asparagus';
        newMealPlan.snack.name = 'Mixed Nuts';
      } else if (dietType === 'low-fat') {
        newMealPlan.breakfast.name = 'Fruit Smoothie Bowl';
        newMealPlan.lunch.name = 'Turkey and Vegetable Wrap';
        newMealPlan.dinner.name = 'Baked Cod with Quinoa';
        newMealPlan.snack.name = 'Apple with Honey';
      } else if (dietType === 'high-protein') {
        newMealPlan.breakfast.name = 'Protein Pancakes';
        newMealPlan.lunch.name = 'Grilled Chicken Breast with Quinoa';
        newMealPlan.dinner.name = 'Bison Burger with Sweet Potato';
        newMealPlan.snack.name = 'Protein Shake with Berries';
      }
      
      setMealPlan(newMealPlan);
      setIsLoading(false);
    }, 1500);
  };

  // Simple icon map using emoji instead of external libraries
  const mealIcons = {
    breakfast: "☕",
    lunch: "🍽️",
    dinner: "🌙",
    snack: "🍎"
  };

  // Component for macro nutrient display
  const MacroDisplay = ({ type, value, color }) => (
    <div className="flex flex-col items-center">
      <div className={`text-xs font-medium ${color}`}>{type}</div>
      <div className="text-lg font-bold">{value}g</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 md:p-6 rounded-t-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
          <span className="mr-2">🍽️</span> 
          Smart Meal Planner
        </h2>
        <p className="text-blue-100 mt-1">Create personalized meal plans based on your dietary preferences</p>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-b-lg shadow-sm">
        {/* Settings Panel */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet Type
              </label>
              <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
                <select 
                  value={dietType} 
                  onChange={e => setDietType(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm bg-white px-4 py-2 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="balanced">Balanced</option>
                  <option value="low-carb">Low Carb</option>
                  <option value="low-fat">Low Fat</option>
                  <option value="high-protein">High Protein</option>
                </select>
                {showTooltip && (
                  <div className="absolute left-0 -bottom-24 w-64 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
                    {dietDescriptions[dietType]}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Calories
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="1200"
                  max="3500"
                  step="100"
                  value={targetCalories}
                  onChange={e => setTargetCalories(Number(e.target.value))}
                  className="flex-grow mr-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-16 text-center font-semibold text-gray-700">{targetCalories}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center justify-center w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md shadow-md transition-all"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center">
                  Generate Meal Plan <span className="ml-2">→</span>
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Progress Summary Card */}
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Nutrition</h3>
          
          {/* Calorie Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Calorie Progress</span>
              <span className="text-sm font-medium">{totalDailyCalories} / {targetCalories} cal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${calorieProgress > 95 ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${calorieProgress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Macronutrients */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-lg">
            <MacroDisplay type="Protein" value={totalProtein} color="text-red-600" />
            <MacroDisplay type="Carbs" value={totalCarbs} color="text-blue-600" />
            <MacroDisplay type="Fat" value={totalFat} color="text-yellow-600" />
          </div>
        </div>
        
        {/* Meal Plan Tabs */}
        <div className="mb-4">
          <div className="flex overflow-x-auto space-x-1 border-b border-gray-200">
            {Object.keys(mealPlan).map((meal) => (
              <button
                key={meal}
                onClick={() => setActiveTab(meal)}
                className={`py-2 px-4 flex items-center whitespace-nowrap ${
                  activeTab === meal
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-1">{mealIcons[meal]}</span>
                <span className="capitalize">{meal}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Active Meal Display */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={mealPlan[activeTab].image} 
                alt={mealPlan[activeTab].name} 
                className="h-48 w-full object-cover md:h-full"
              />
            </div>
            <div className="p-4 md:w-2/3">
              <h3 className="text-xl font-bold text-gray-800">
                {mealPlan[activeTab].name}
              </h3>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-blue-700 font-medium">{mealPlan[activeTab].calories} cal</span>
                </div>
                <div className="flex items-center bg-red-50 px-3 py-1 rounded-full">
                  <span className="text-red-700 font-medium">{mealPlan[activeTab].protein}g protein</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-blue-700 font-medium">{mealPlan[activeTab].carbs}g carbs</span>
                </div>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-700 font-medium">{mealPlan[activeTab].fat}g fat</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <span className="mr-1">✓</span> Add to My Plan
                </button>
                <button className="px-4 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
          
          {/* Placeholder for additional meal details */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-2">Options</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Substitute ingredients</span>
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Adjust portion size</span>
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-gray-100">See alternatives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;


