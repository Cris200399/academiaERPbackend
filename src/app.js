const express = require('express');
const cors = require('cors');
//routes
const groupRoutes = require('./routes/groupClassRoutes');
const studentRoutes = require('./routes/studentRoutes');
const guardianRoutes = require('./routes/guardianRoutes');
const assistanceRoutes = require('./routes/assistanceRoutes');
const privateClassPaymentRoutes = require('./routes/privateClassPaymentRoutes');
const groupPaymentRoutes = require('./routes/groupPaymentRoutes');
const paymentsReportsRoutes = require('./routes/paymentsReportsRoutes');
const privateClassRoutes = require('./routes/privateClassRoutes');
const privateClassAndPaymentRoutes = require('./routes/privateClassAndPaymentRoutes');
const authRoutes = require('./routes/authRoutes');



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/guardians', guardianRoutes);
app.use('/api/private-class-payments', privateClassPaymentRoutes);
app.use('/api/assistances', assistanceRoutes);
app.use('/api/group-payments', groupPaymentRoutes);
app.use('/api/payments-reports', paymentsReportsRoutes);
app.use('/api/private-classes', privateClassRoutes);
app.use('/api/private-class-and-payments', privateClassAndPaymentRoutes);
app.use('/api/auth', authRoutes);


// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
});

module.exports = app;