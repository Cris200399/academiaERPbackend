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
 *         - startDate
 *         - endDate
 *         - paymentMethod
 *       properties:
 *         student:
 *           type: string
 *           description: Reference to the student making the payment
 *         type:
 *           type: string
 *           enum:
 *             - group
 *             - private
 *           description: Type of payment, either for a group or a private class
 *         amount:
 *           type: number
 *           description: Amount of the payment
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the period covered by the payment
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the period covered by the payment
 *         group:
 *           type: string
 *           description: Reference to the group if the payment is for a group
 *         privateClass:
 *           type: string
 *           description: Reference to the private class if the payment is for a private class
 *         paymentMethod:
 *           type: string
 *           enum:
 *             - efectivo
 *             - tarjeta_de_crédito
 *             - transferencia_bancaria
 *             - yape
 *             - plin
 *           description: Method of payment
 *         description:
 *           type: string
 *           description: Additional details about the payment
 *       example:
 *         student: 60d0fe4f5311236168a109ca
 *         type: group
 *         amount: 100
 *         startDate: 01-02-2024
 *         endDate: 01-03-2025
 *         group: 60d0fe4f5311236168a109cb
 *         paymentMethod: efectivo
 *         description: January group payment
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
    startDate: {
        type: Date, // Fecha de inicio del periodo que cubre el pago.
        required: true,
    },
    endDate: {
        type: Date, // Fecha de fin del periodo.
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group', // Relación con un grupo si el pago es de tipo 'group'.
        required: function () {
            return this.type === 'group';
        },
    },
    privateClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrivateClass', // Relación con una clase particular si el pago es de tipo 'private'.
        required: function () {
            return this.type === 'private';
        },
    },
    paymentMethod: {
        type: String,
        enum: paymentMethods, // Métodos de pago.
        required: [true, 'Payment method is required'],
    },
    description: {
        type: String, // Detalles adicionales sobre el pago.
        required: false,
    },
}, {timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema);