import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css'; // Create this file for custom nav styles

const Navigation = () => {
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="main-navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <img src="/logo.png" alt="NutriByte Logo" className="navbar-logo" />
                    <span className="brand-title">NutriByte</span>
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/log-food" className={location.pathname === "/log-food" ? "active" : ""}>Log Food</Link>
                </li>
                <li>
                    <Link to="/meal-planner" className={location.pathname === "/meal-planner" ? "active" : ""}>Meal Planner</Link>
                </li>
                <li>
                    <Link to="/goals" className={location.pathname === "/goals" ? "active" : ""}>Goals</Link>
                </li>
                <li>
                    <Link to="/analytics" className={location.pathname === "/analytics" ? "active" : ""}>Analytics</Link>
                </li>
                {isLoggedIn ? (
                    <li>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;








