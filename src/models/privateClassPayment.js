const mongoose = require('mongoose');
const paymentMethods = require("../constants/paymentMethods");


/**
 * @swagger
 * components:
 *   schemas:
 *     PrivateClassPayment:
 *       type: object
 *       required:
 *         - student
 *         - amount
 *         - date
 *         - privateClass
 *         - paymentMethod
 *       properties:
 *         student:
 *           type: string
 *           description: The ID of the student
 *         amount:
 *           type: number
 *           description: The amount paid
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the payment
 *         privateClass:
 *           type: string
 *           description: The ID of the private class
 *         paymentMethod:
 *           type: array
 *           items:
 *             type: string
 *           description: The method(s) of payment
 */
const privateClassPaymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    date: {
        type: Date, // Fecha del pago.
        required: true
    },
    privateClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrivateClass',
        required: [true, 'Private class is required'],
    },
    paymentMethod: {
        type: [String],
        enum: paymentMethods, // Métodos de pago.
        required: [true, 'Payment method is required'],
    }
}, {timestamps: true});

module.exports = mongoose.model('PrivateClassPayment', privateClassPaymentSchema);
