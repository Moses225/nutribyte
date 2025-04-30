const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://moisestephanekouassi:pfFIYOANr1sAvcgp@cluster0.kfpbywm.mongodb.net/nutribyte?retryWrites=true&w=majority');
        console.log('DB connection successful.');
    } catch (err) {
        console.error(`DB connection error: ${err}`);
    }
};

module.exports = connectDB;

