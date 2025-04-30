import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Analytics.css'; // New CSS for this page

const data = [
    { week: 'Week 1', weight: 75, bodyFat: 25 },
    { week: 'Week 2', weight: 74, bodyFat: 24.5 },
    { week: 'Week 3', weight: 73, bodyFat: 24 },
    { week: 'Week 4', weight: 72, bodyFat: 23.5 },
];

export default function Analytics() {
    return (
        <div className="analytics-page">
            <Container className="py-5">
                <h2 className="text-center mb-4 animate-fade-in">Progress Analytics 📈</h2>

                {/* Summary Box */}
                <Row className="mb-5">
                    <Col xs={12} md={6} className="mx-auto">
                        <Card className="summary-card animate-slide-up">
                            <Card.Body>
                                <h5 className="text-center mb-3">Summary</h5>
                                <Row className="text-center">
                                    <Col>
                                        <h4>🏋️‍♂️ -3kg</h4>
                                        <p>Weight Loss</p>
                                    </Col>
                                    <Col>
                                        <h4>📉 -1.5%</h4>
                                        <p>Body Fat Reduced</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Chart Section */}
                <Card className="chart-card animate-slide-up delay-1">
                    <Card.Body>
                        <h5 className="text-center mb-4">Monthly Progress</h5>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} animationDuration={1500} />
                                    <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} animationDuration={1500} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
