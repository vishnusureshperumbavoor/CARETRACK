const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://akshaymmaimbilly:akshaymm@cluster0.iyvhtug.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
 console.error('MongoDB connection error:', err);
});

connection.once('open', () => {
 console.log('Connected to MongoDB');
});

module.exports = mongoose;
