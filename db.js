const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bookshelfDB');
        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;