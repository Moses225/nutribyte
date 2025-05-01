import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import './FoodLog.css';

const LogFood = () => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [foodEntries, setFoodEntries] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalCalories, setTotalCalories] = useState(0);
    const [offlineMode, setOfflineMode] = useState(false);
    
    // Mock token for development
    const token = localStorage.getItem('authToken') || 'mock-token';

    // Load saved entries from localStorage if available
    useEffect(() => {
        const savedEntries = localStorage.getItem('foodEntries');
        if (savedEntries) {
            try {
                const parsedEntries = JSON.parse(savedEntries);
                setFoodEntries(parsedEntries);
                calculateTotalCalories(parsedEntries);
            } catch (err) {
                console.error('Error parsing saved entries:', err);
            }
        }
    }, []);

    const saveToLocalStorage = (entries) => {
        localStorage.setItem('foodEntries', JSON.stringify(entries));
    };

    const fetchFoodEntries = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/foods/food-entries', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error('Server responded with an error');
            
            const data = await response.json();
            setFoodEntries(data);
            calculateTotalCalories(data);
            setError('');
            setOfflineMode(false);
        } catch (err) {
            console.error('Error fetching food entries:', err);
            // If we have local data, don't show an error
            if (foodEntries.length > 0) {
                setOfflineMode(true);
            } else {
                setError('Unable to connect to server. Operating in offline mode.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodEntries();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const calculateTotalCalories = (entries) => {
        const total = entries.reduce((sum, entry) => sum + (parseInt(entry.calories) || 0), 0);
        setTotalCalories(total);
    };

    const addEntryOffline = () => {
        const newEntry = {
            _id: `local-${Date.now()}`,
            name: foodName,
            calories: parseInt(calories, 10),
            createdAt: new Date().toISOString()
        };
        
        const updatedEntries = [...foodEntries, newEntry];
        setFoodEntries(updatedEntries);
        calculateTotalCalories(updatedEntries);
        saveToLocalStorage(updatedEntries);
        
        return newEntry;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!foodName.trim() || isNaN(parseInt(calories)) || parseInt(calories) <= 0) {
            setError('Please enter valid food name and calories');
            return;
        }

        setError('');
        
        try {
            let newEntry;
            
            if (offlineMode) {
                newEntry = addEntryOffline();
            } else {
                try {
                    const response = await fetch('/api/foods/food-entries', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ name: foodName, calories: parseInt(calories, 10) })
                    });
                    
                    if (!response.ok) {
                        // If server request fails, fall back to offline mode
                        console.warn('Server request failed, using offline mode');
                        setOfflineMode(true);
                        newEntry = addEntryOffline();
                    } else {
                        newEntry = await response.json();
                        const updatedEntries = [...foodEntries, newEntry];
                        setFoodEntries(updatedEntries);
                        calculateTotalCalories(updatedEntries);
                        saveToLocalStorage(updatedEntries);
                    }
                } catch (err) {
                    console.error('Network error:', err);
                    setOfflineMode(true);
                    newEntry = addEntryOffline();
                }
            }
            
            setFoodName('');
            setCalories('');
            setSuccessMessage('🍎 Food entry added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Error in submit handler:', err);
            setError('Failed to add food entry. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            // If it's a local ID, just delete from local state
            if (id.startsWith('local-') || offlineMode) {
                const updatedEntries = foodEntries.filter(entry => entry._id !== id);
                setFoodEntries(updatedEntries);
                calculateTotalCalories(updatedEntries);
                saveToLocalStorage(updatedEntries);
                setSuccessMessage('Food entry deleted!');
                setTimeout(() => setSuccessMessage(''), 3000);
                return;
            }
            
            // Try server delete
            try {
                const response = await fetch(`/api/foods/food-entries/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) throw new Error('Failed to delete from server');
            } catch (err) {
                console.warn('Server delete failed, doing local delete only');
            }
            
            // Always update local state even if server request fails
            const updatedEntries = foodEntries.filter(entry => entry._id !== id);
            setFoodEntries(updatedEntries);
            calculateTotalCalories(updatedEntries);
            saveToLocalStorage(updatedEntries);
            setSuccessMessage('Food entry deleted!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Error deleting food entry:', err);
            setError('Failed to delete entry');
        }
    };

    const toggleOfflineMode = () => {
        setOfflineMode(prev => !prev);
        if (offlineMode) {
            fetchFoodEntries(); // Try to reconnect when toggling off
        }
    };

    return (
        <div className="foodlog-page">
            <Container className="py-4">
                <h2 className="text-center mb-4">Food Log 🍽️</h2>
                
                {offlineMode && (
                    <Alert variant="warning" className="d-flex justify-content-between align-items-center">
                        <div>📶 Working offline. Your entries are saved locally.</div>
                        <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={toggleOfflineMode}
                        >
                            Try to reconnect
                        </Button>
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} className="food-form mb-4">
                    <Row className="g-3">
                        <Col xs={12} md={5}>
                            <Form.Control
                                type="text"
                                placeholder="Food Name"
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                required
                            />
                        </Col>
                        <Col xs={12} md={5}>
                            <Form.Control
                                type="number"
                                placeholder="Calories"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                required
                                min="1"
                            />
                        </Col>
                        <Col xs={12} md={2}>
                            <Button type="submit" variant="primary" className="w-100 add-food-btn">
                                Add
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {successMessage && <Alert variant="success" className="animated-alert text-center">{successMessage}</Alert>}
                {error && (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <>
                        {foodEntries.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>Today's Log</h4>
                                <div className="total-calories">
                                    <strong>Total Calories: {totalCalories}</strong>
                                </div>
                            </div>
                        )}

                        {foodEntries.length === 0 ? (
                            <div className="text-center empty-state my-5">
                                <i className="bi bi-journal-plus fs-1 text-muted"></i>
                                <p className="text-muted mt-3">No food entries yet. Start logging your meals! 🥗</p>
                                <Button variant="outline-primary" onClick={() => document.querySelector('input').focus()}>
                                    Add your first meal
                                </Button>
                            </div>
                        ) : (
                            <Row className="g-4">
                                {foodEntries.map(entry => (
                                    <Col key={entry._id || Math.random().toString()} xs={12} sm={6} lg={4}>
                                        <Card className="food-card h-100">
                                            <Card.Body className="d-flex flex-column">
                                                <div className="d-flex justify-content-between">
                                                    <Card.Title>{entry.name}</Card.Title>
                                                    <span className="calories-badge">{entry.calories} kcal</span>
                                                </div>
                                                {entry.createdAt && (
                                                    <small className="text-muted">
                                                        {new Date(entry.createdAt).toLocaleString()}
                                                    </small>
                                                )}
                                                <div className="mt-auto pt-3 d-flex justify-content-end">
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm"
                                                        onClick={() => handleDelete(entry._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default LogFood;






