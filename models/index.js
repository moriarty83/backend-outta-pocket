const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/PlanetExpressShip';

mongoose.connect(connectionString)
    .then(() => console.log('MongoDB successfully connected...'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Comment: require('./Comment'),
    User: require('./User'),
    Reaction: require('./Reaction'),
    Video: require('./Video'),
};