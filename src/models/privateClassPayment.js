const mongoose = require('mongoose');
const paymentMethods = require("../constants/paymentMethods");

const privateClassPaymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    date: {
        type: Date, // Fecha del pago.
        required: true
    },
    paymentMethod: {
        type: [String],
        enum: paymentMethods, // Métodos de pago.
        required: [true, 'Payment method is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
    },
    description: {
        type: String, // Detalles adicionales sobre el pago.
        required: false,
    },
    status: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'pagado']
    }
}, {timestamps: true});

module.exports = mongoose.model('PrivateClassPayment', privateClassPaymentSchema);
