const mongoose = require('mongoose');
const paymentTypes = require("../constants/paymentTypes");
const paymentMethods = require("../constants/paymentMethods");

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - student
 *         - type
 *         - amount
 *         - date
 *         - paymentMethod
 *       properties:
 *         student:
 *           type: string
 *           description: The ID of the student making the payment
 *         type:
 *           type: string
 *           description: The type of payment (group or private)
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the payment
 *         groupPayment:
 *           type: string
 *           description: The ID of the group payment if the type is 'group'
 *         privatePayment:
 *           type: string
 *           description: The ID of the private payment if the type is 'private'
 *         paymentMethod:
 *           type: array
 *           items:
 *             type: string
 *           description: The methods of payment
 *         description:
 *           type: string
 *           description: Additional details about the payment
 *         status:
 *           type: string
 *           description: The status of the payment (pending or paid)
 */
const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required'],
    },
    type: {
        type: String,
        enum: paymentTypes, // Pago por grupo o por clase particular.
        required: [true, 'Payment type is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    date: {
        type: Date, // Fecha del pago.
        required: true
    },
    groupPayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupClassPayment', // Relación con el groupPayment si el pago es de tipo 'group'.
        required: function () {
            return this.type === 'grupal';
        },
    },
    privatePayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrivateClassPayment', // Relación con una clase particular si el pago es de tipo 'private'.
        required: function () {
            return this.type === 'particular';
        },
    },
    paymentMethod: {
        type: [String],
        enum: paymentMethods, // Métodos de pago.
        required: [true, 'Payment method is required'],
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

module.exports = mongoose.model('Payment', paymentSchema);