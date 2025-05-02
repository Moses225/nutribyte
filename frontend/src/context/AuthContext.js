import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchUserProfile(storedToken);
        }
    }, []);

    // LOGIN
const login = async (credentials) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsLoggedIn(true);
            await fetchUserProfile(data.token);
            navigate('/dashboard');
        } else {
            console.error('Login failed:', data.message);
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// SIGNUP
const signup = async (credentials) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsLoggedIn(true);
            await fetchUserProfile(data.token);
            navigate('/dashboard');
        } else {
            console.error('Signup failed:', data.message);
            throw new Error(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};


    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    // FETCH USER PROFILE
const fetchUserProfile = async (token) => {
    try {
        const response = await fetch('/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            setUser(userData);
        } else {
            console.error('Failed to fetch user profile');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

    const contextValue = {
        isLoggedIn,
        login,
        logout,
        signup,
        user,
        token,
        fetchUserProfile
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



