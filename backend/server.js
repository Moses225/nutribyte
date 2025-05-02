const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');

connectDB();

const app = express();

// Enable CORS for frontend origin
//app.use(cors({
  //origin: 'http://localhost:3000',
 // credentials: true
 app.use(cors({ origin: true, credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', foodRoutes);

app.use(errorHandler);

// Serve frontend static files (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
  
}

app.listen(port, () => console.log(`Server started on port ${port}`));

