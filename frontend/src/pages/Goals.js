import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import './Goals.css';

// Mock implementation that doesn't require a backend
const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [newGoalText, setNewGoalText] = useState('');
    const [editingGoalId, setEditingGoalId] = useState(null);
    const [editedGoalText, setEditedGoalText] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load mock data on component mount
    useEffect(() => {
        // Simulate API loading delay
        const timer = setTimeout(() => {
            const savedGoals = localStorage.getItem('goals');
            if (savedGoals) {
                setGoals(JSON.parse(savedGoals));
            }
            setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);

    // Save goals to localStorage whenever goals state changes
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('goals', JSON.stringify(goals));
        }
    }, [goals, isLoading]);

    const handleAddGoal = (e) => {
        e.preventDefault();
        
        if (!newGoalText.trim()) {
            setMessage({ text: 'Please enter a goal', type: 'warning' });
            return;
        }
        
        // Simulate API call with loading state
        setIsSubmitting(true);
        
        setTimeout(() => {
            const newGoal = {
                _id: Date.now().toString(), // Generate a unique ID
                text: newGoalText,
                createdAt: new Date().toISOString()
            };
            
            setGoals(prevGoals => [...prevGoals, newGoal]);
            setNewGoalText('');
            setMessage({ text: '🎯 Goal added successfully!', type: 'success' });
            setIsSubmitting(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }, 500); // Simulate network delay
    };

    const handleEditGoal = (goal) => {
        setEditingGoalId(goal._id);
        setEditedGoalText(goal.text);
    };

    const handleUpdateGoal = (id, newText) => {
        if (!newText.trim()) {
            setMessage({ text: 'Goal text cannot be empty', type: 'warning' });
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            setGoals(prevGoals => 
                prevGoals.map(goal => 
                    goal._id === id 
                        ? { ...goal, text: newText, updatedAt: new Date().toISOString() } 
                        : goal
                )
            );
            
            setEditingGoalId(null);
            setEditedGoalText('');
            setMessage({ text: '✅ Goal updated successfully!', type: 'success' });
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }, 300);
    };

    const handleCancelEdit = () => {
        setEditingGoalId(null);
        setEditedGoalText('');
    };

    const handleDeleteGoal = (id) => {
        if (!window.confirm('Are you sure you want to delete this goal?')) {
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            setGoals(prevGoals => prevGoals.filter(goal => goal._id !== id));
            setMessage({ text: '🗑️ Goal deleted successfully!', type: 'success' });
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }, 300);
    };

    const handleKeyDown = (e, goalId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateGoal(goalId, editedGoalText);
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <div className="container my-5 goals-page">
            <h2 className="text-center mb-4">Your Goals 🎯</h2>
            
            {/* Notice panel explaining the mock implementation */}
            <Alert variant="info" className="mb-4">
                <Alert.Heading>Using Local Storage</Alert.Heading>
                <p>
                    This is a mock version of the Goals component that stores data in your browser's local storage 
                    instead of connecting to a backend API. Your goals will persist across page refreshes but only on this device.
                </p>
            </Alert>

            <Form onSubmit={handleAddGoal} className="mb-4 goal-form">
                <Row className="g-2 align-items-center">
                    <Col xs={12} sm={8} md={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter your goal"
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            required
                            disabled={isSubmitting}
                            className="mb-2 mb-sm-0"
                        />
                    </Col>
                    <Col xs={12} sm={4} md={2}>
                        <Button 
                            type="submit" 
                            variant="success" 
                            className="w-100 add-goal-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-1" />
                                    Adding...
                                </>
                            ) : 'Add Goal'}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {message.text && (
                <Alert variant={message.type} className="text-center animated-alert">
                    {message.text}
                </Alert>
            )}

            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Loading your goals...</p>
                </div>
            ) : goals.length === 0 ? (
                <div className="text-center my-5 empty-state">
                    <h4>No goals yet</h4>
                    <p>Add your first goal using the form above!</p>
                </div>
            ) : (
                <Row className="g-4">
                    {goals.map(goal => (
                        <Col key={goal._id} xs={12} sm={6} lg={4}>
                            <Card className="goal-card h-100">
                                <Card.Body>
                                    {editingGoalId === goal._id ? (
                                        <Form.Control
                                            type="text"
                                            value={editedGoalText}
                                            onChange={(e) => setEditedGoalText(e.target.value)}
                                            onBlur={handleCancelEdit}
                                            onKeyDown={(e) => handleKeyDown(e, goal._id)}
                                            autoFocus
                                            className="mb-2"
                                        />
                                    ) : (
                                        <Card.Title className="goal-text">{goal.text}</Card.Title>
                                    )}
                                    <div className="goal-actions">
                                        {editingGoalId === goal._id ? (
                                            <>
                                                <Button 
                                                    variant="success" 
                                                    onClick={() => handleUpdateGoal(goal._id, editedGoalText)}
                                                    size="sm"
                                                >
                                                    Save
                                                </Button>
                                                <Button 
                                                    variant="secondary" 
                                                    onClick={handleCancelEdit}
                                                    size="sm"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button 
                                                    variant="outline-warning" 
                                                    onClick={() => handleEditGoal(goal)}
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    variant="outline-danger" 
                                                    onClick={() => handleDeleteGoal(goal._id)}
                                                    size="sm"
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Goals;