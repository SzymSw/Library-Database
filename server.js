const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://localhost/library')
    .then(() => {
        app.listen(3000, () => {
            console.log('Library database is running on port 3000');
        });
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Database connection error:', error);
    });
