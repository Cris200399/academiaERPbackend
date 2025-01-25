const mongoose = require('mongoose');
const paymentMethods = require("../constants/paymentMethods");


const groupClassPaymentSchema = new mongoose.Schema({
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
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
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

module.exports = mongoose.model('GroupClassPayment', groupClassPaymentSchema);