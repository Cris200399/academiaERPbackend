const express = require('express');

//routes
const groupRoutes = require('./routes/groupRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);


// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
});

module.exports = app;