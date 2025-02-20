const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     Guardian:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - relationship
 *       properties:
 *         name:
 *           type: string
 *           description: Guardian's full name
 *         phone:
 *           type: string
 *           description: Guardian's phone number
 *           unique: true
 *         relationship:
 *           type: string
 *           description: Guardian's relationship to the student
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the guardian was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the guardian was last updated
 */
const guardianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true
    },
    relationship: {
        type: String,
        required: [true, 'Relationship is required'],
    }
}, {timestamps: true});

const Guardian = mongoose.model('Guardian', guardianSchema);


module.exports = Guardian;