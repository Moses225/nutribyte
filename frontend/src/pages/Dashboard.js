import React, { useState} from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  LineChart, Line, PieChart, Pie, Cell, Legend 
} from 'recharts';

// Simple Icons (Reused)
const Icon = ({ children }) => <span className="text-lg mr-2">{children}</span>;

// Mock Data
const weekData = [
  { day: 'Mon', calories: 2200, protein: 115 },
  { day: 'Tue', calories: 1900, protein: 105 },
  { day: 'Wed', calories: 2500, protein: 130 },
  { day: 'Thu', calories: 2300, protein: 125 },
  { day: 'Fri', calories: 2400, protein: 128 },
  { day: 'Sat', calories: 2150, protein: 110 },
  { day: 'Sun', calories: 2000, protein: 100 },
];

const macroData = [
  { name: 'Protein', value: 120, color: '#8884d8' },
  { name: 'Carbs', value: 250, color: '#82ca9d' },
  { name: 'Fat', value: 70, color: '#ffc658' },
];

const mealLog = [
  { name: 'Breakfast', calories: 450, time: '8:00 AM' },
  { name: 'Lunch', calories: 700, time: '1:00 PM' },
  { name: 'Dinner', calories: 600, time: '7:00 PM' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('daily');
  const [waterIntake, setWaterIntake] = useState(1.5);
  const calorieGoal = 2500;
  const currentCalories = 2100;

  const addWater = () => setWaterIntake(w => +(w + 0.25).toFixed(2));
  const removeWater = () => setWaterIntake(w => (w > 0 ? +(w - 0.25).toFixed(2) : 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Nutrition Dashboard</h1>
        <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-4">
        {['daily', 'progress', 'meals'].map(item => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-6 py-2 rounded-full text-sm font-semibold 
              ${tab === item ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border border-purple-600'} 
              hover:bg-purple-700 hover:text-white transition`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'daily' && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Calories */}
          <Card title="Calories" icon="🔥">
            <ProgressBar label="Calories" current={currentCalories} goal={calorieGoal} />
          </Card>

          {/* Macros */}
          <Card title="Macronutrients" icon="🍽️">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={macroData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {macroData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Water & Activity */}
          <Card title="Water & Activity" icon="💧">
            <p className="text-center mb-4 font-medium">{waterIntake}L / 2.5L</p>
            <ProgressBar label="Water Intake" current={waterIntake} goal={2.5} />
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={removeWater} className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">-0.25L</button>
              <button onClick={addWater} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+0.25L</button>
            </div>
          </Card>
        </div>
      )}

      {tab === 'progress' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Calories */}
          <Card title="Weekly Calorie Intake" icon="📊">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Weekly Protein */}
          <Card title="Weekly Protein Intake" icon="🥩">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weekData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="protein" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {tab === 'meals' && (
        <Card title="Today's Meal Log" icon="🍴">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Meal</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Calories</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {mealLog.map((meal, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-3">{meal.name}</td>
                    <td className="p-3">{meal.time}</td>
                    <td className="p-3">{meal.calories} cal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// Card Component
function Card({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Icon>{icon}</Icon> {title}
      </h2>
      {children}
    </div>
  );
}

// Progress Bar
function ProgressBar({ label, current, goal }) {
  const percentage = Math.min(100, (current / goal) * 100);
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-gray-600 text-center">{Math.round(percentage)}% of goal</p>
    </div>
  );
}
