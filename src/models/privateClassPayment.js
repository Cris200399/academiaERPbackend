const mongoose = require('mongoose');

const privateClassPaymentSchema = new mongoose.Schema({
    date: {
        type: Date, // Fecha de la clase particular.
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
    },
}, {timestamps: true});

module.exports = mongoose.model('PrivateClassPayment', privateClassPaymentSchema);
