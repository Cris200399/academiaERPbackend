const express = require('express');
const cors = require('cors');
//routes
const groupRoutes = require('./routes/groupClassRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assistanceRoutes = require('./routes/assistanceRoutes');
const privateClassRoutes = require('./routes/privateClass');
const groupPaymentRoutes = require('./routes/groupPaymentRoutes');
const paymentsReportsRoutes = require('./routes/paymentsReportsRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/private-class', privateClassRoutes);
app.use('/api/assistances', assistanceRoutes);
app.use('/api/group-payments', groupPaymentRoutes);
app.use('/api/payments-reports', paymentsReportsRoutes);


// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
});

module.exports = app;