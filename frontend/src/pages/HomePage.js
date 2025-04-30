import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    // State for BMI calculator
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    
    // State for testimonial carousel
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    // State for nutrition tip
    const [currentTip, setCurrentTip] = useState(0);
    
    // State for countdown timer
    const [timeLeft, setTimeLeft] = useState(null);
    
    // Sample testimonials data
    const testimonials = [
        {
            name: "Logan Huba",
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
            text: "This app helped me lose 15 pounds in 3 months while maintaining proper nutrition!"
        },
        {
            name: "Dr. Neelam Dwivedi",
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
            text: "The meal planning feature saved me so much time and helped me stay consistent with my diet."
        },
        {
            name: "Herve Taning Kaffo",
            image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
            text: "I finally understand my nutritional needs thanks to the detailed analytics and reports."
        }
    ];
    
    // Sample nutrition tips
    const nutritionTips = [
        "Drink water before meals to help control portion sizes and stay hydrated.",
        "Aim for at least 5 servings of fruits and vegetables daily for essential nutrients.",
        "Include protein in every meal to help maintain muscle mass and feel fuller longer.",
        "Limit processed foods and focus on whole, nutrient-dense options instead."
    ];
    
    // Calculate BMI
    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBmi(bmiValue);
            
            // Determine BMI category
            if (bmiValue < 18.5) {
                setBmiCategory('Underweight');
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                setBmiCategory('Normal weight');
            } else if (bmiValue >= 25 && bmiValue < 30) {
                setBmiCategory('Overweight');
            } else {
                setBmiCategory('Obesity');
            }
        }
    };
    
    // Rotate testimonials every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [testimonials.length]);
    
    // Rotate nutrition tips every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % nutritionTips.length);
        }, 8000);
        
        return () => clearInterval(interval);
    }, [nutritionTips.length]);
    
    // Special offer countdown timer
    useEffect(() => {
        const deadline = new Date();
        deadline.setHours(deadline.getHours() + 24);
        
        const interval = setInterval(() => {
            const now = new Date();
            const difference = deadline - now;
            
            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft(null);
                return;
            }
            
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Transform Your Nutrition Journey</h1>
                    <p>Track, Plan, and Achieve Your Health Goals</p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="btn-primary">Get Started</Link>
                        <Link to="/log-food" className="btn-secondary">Log Food Now</Link>
                    </div>
                    
                    {timeLeft && (
                        <div className="special-offer-card">
                            <h3>Special Offer Ends In:</h3>
                            <div className="countdown-timer">{timeLeft}</div>
                            <p>Get 30% off premium plan today!</p>
                        </div>
                    )}
                </div>
            </div>

            <section className="features-section">
                <h2 className="section-title">Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Tracking" />
                        <h3>Food Tracking</h3>
                        <p>Log meals and monitor nutrient intake effortlessly</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Meal Plans" />
                        <h3>Smart Meal Plans</h3>
                        <p>Personalized recommendations based on your goals</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Analytics" />
                        <h3>Progress Analytics</h3>
                        <p>Track your journey with visual charts and reports</p>
                    </div>
                </div>
            </section>
            
            <section className="bmi-section">
                <h2 className="section-title">BMI Calculator</h2>
                <div className="bmi-calculator">
                    <div className="input-group">
                        <label>Height (cm)</label>
                        <input 
                            type="number" 
                            value={height} 
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter height"
                        />
                    </div>
                    <div className="input-group">
                        <label>Weight (kg)</label>
                        <input 
                            type="number" 
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter weight"
                        />
                    </div>
                    <button className="calculate-btn" onClick={calculateBMI}>Calculate BMI</button>
                    
                    {bmi && (
                        <div className="bmi-results">
                            <h3>Your BMI: {bmi}</h3>
                            <p>Category: <span className={`bmi-category ${bmiCategory.toLowerCase().replace(' ', '-')}`}>{bmiCategory}</span></p>
                            <Link to="/personalized-plan" className="plan-link">Get Personalized Plan</Link>
                        </div>
                    )}
                </div>
            </section>
            
            <section className="testimonials-section">
                <h2 className="section-title">Success Stories</h2>
                <div className="testimonial-carousel">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                            className={`testimonial-slide ${index === currentTestimonial ? 'active' : ''}`}
                        >
                            <img src={testimonial.image} alt={testimonial.name} />
                            <blockquote>"{testimonial.text}"</blockquote>
                            <p className="testimonial-author">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
                <div className="carousel-indicators">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={index === currentTestimonial ? 'active' : ''}
                            onClick={() => setCurrentTestimonial(index)}
                        />
                    ))}
                </div>
            </section>
            
            <section className="nutrition-tips">
                <h3>Daily Nutrition Tip</h3>
                <div className="tip-container">
                    <p>{nutritionTips[currentTip]}</p>
                </div>
            </section>
            
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h3>Get Weekly Nutrition Updates</h3>
                    <p>Join our community for free recipes, tips, and news</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
