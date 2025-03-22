const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongoDB connection URL
// const mongoURL = process.env.MONGODB_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Setup mongoDB connection
mongoose.connect(mongoURL, {         // For local instance
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get default connection
// Mongoose main a default connection object representing the mongoDB connection
const db = mongoose.connection;

// Define the event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error: ', err);
});

db.on('disconnected', () =>{
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;