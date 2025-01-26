const mongoose = require('mongoose');
const paymentMethods = require("../constants/paymentMethods");


/**
 * @swagger
 * components:
 *   schemas:
 *     GroupClassPayment:
 *       type: object
 *       required:
 *         - student
 *         - amount
 *         - date
 *         - paymentMethod
 *         - groupClass
 *         - startDate
 *         - endDate
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
 *         paymentMethod:
 *           type: array
 *           items:
 *             type: string
 *           description: The method of payment
 *         groupClass:
 *           type: string
 *           description: The ID of the group class
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the group class
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the group class
 *         description:
 *           type: string
 *           description: Additional details about the payment
 *         status:
 *           type: string
 *           enum: [pendiente, pagado]
 *           description: The status of the payment
 */
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
    groupClass: {
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