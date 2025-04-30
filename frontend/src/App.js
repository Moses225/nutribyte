import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import MealPlanner from './pages/MealPlanner';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import Navigation from './components/Navigation';
import Login from './pages/Login';  // Import Login
import Signup from './pages/Signup';// Import Signup
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />  {/* Add Login Route */}
                    <Route path="/signup" element={<Signup />} />{/* Add Signup Route */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/log-food" element={<FoodLog />} />
                        <Route path="/meal-planner" element={<MealPlanner />} />
                        <Route path="/goals" element={<Goals />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
