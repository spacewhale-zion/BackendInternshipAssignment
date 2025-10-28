
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// API Versioning: Mount routes
app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/tasks', require('./routes/api/tasks'));

// Simple root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// (Error handling middleware would go here)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));