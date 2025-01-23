const express = require('express');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);
app.use('/auth', authRoutes);

module.exports = app;
