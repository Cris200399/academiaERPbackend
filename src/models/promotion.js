const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       required:
 *         - name
 *         - group
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the promotion
 *         description:
 *           type: string
 *           description: Additional details about the promotion
 *         group:
 *           type: string
 *           description: Reference to the group associated with the promotion
 *         price:
 *           type: number
 *           description: The price of the promotion
 *         includedMonths:
 *           type: array
 *           items:
 *             type: string
 *           description: The months included in the promotion
 *         includesEnrollment:
 *           type: boolean
 *           description: Indicates if the promotion includes enrollment
 *         validUntil:
 *           type: string
 *           format: date
 *           description: The expiration date of the promotion
 */
const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Promotion name is required'],
    },
    description: {
        type: String,
        required: false,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    includedMonths: {
        type: [String], // Ejemplo: ["January", "February"]
        required: false,
    },
    includesEnrollment: {
        type: Boolean,
        default: false, // Indica si incluye matrícula.
    },
    validUntil: {
        type: Date, // Fecha límite para la promoción.
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
