const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
const userRoutes = require('./routes/userRoutes');


const app = express();


const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://iridescent-mousse-e5cc8b.netlify.app', 'https://academiaerpfrontend.onrender.com'],
    credentials: true, // Habilita el envío de cookies y cabeceras de autorización
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

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
app.use('/api/users', userRoutes);


// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;