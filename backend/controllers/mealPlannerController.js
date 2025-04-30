exports.generateMealPlan = async (req, res) => {
    const { dietType, targetCalories } = req.body;
    // Generate a plan based on dietType and targetCalories (mock or real logic)
    res.json({ breakfast: 'Oats', lunch: 'Salad', dinner: 'Chicken' });
};
