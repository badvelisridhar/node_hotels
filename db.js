const mongoose = require('mongoose');

// Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Setup mongoDB connection
mongoose.connect(mongoURL, {
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