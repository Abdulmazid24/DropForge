require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('DropForge API is running...');
});

// Database Connection
const connectDB = async () => {
    try {
        // TODO: Add MONGO_URI to .env
        // await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected (Placeholder)');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
