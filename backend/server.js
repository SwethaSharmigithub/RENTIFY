const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PropertyRoutes = require('./routes/PropertyRoutes');
const authRoutes = require('./routes/auth'); 

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/rentify2")
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Error while connecting to MongoDB', err));

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api/properties', PropertyRoutes);


const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
