
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/tasks', require('./routes/api/tasks'));

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));