const mongoose = require('mongoose');
const assistanceStatus = require("../constants/assistanceStatus");


/**
 * @swagger
 * components:
 *   schemas:
 *     Assistance:
 *       type: object
 *       required:
 *         - student
 *         - group
 *         - date
 *         - status
 *       properties:
 *         student:
 *           type: string
 *           description: The ID of the student
 *         group:
 *           type: string
 *           description: The ID of the group
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the assistance
 *         status:
 *           type: string
 *           description: The status of the assistance
 *           enum:
 *             - Presente
 *             - Ausente
 */
const assistanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required'],
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    status: {
        type: String,
        enum: assistanceStatus,
        required: [true, 'Status is required'],
        default: 'Ausente',
    },
});

assistanceSchema.index({ student: 1, group: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Assistance', assistanceSchema);