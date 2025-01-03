const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - daysOfWeek
 *         - schedule
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the group
 *         description:
 *           type: string
 *           description: The description of the group
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: The members of the group
 *         daysOfWeek:
 *           type: array
 *           items:
 *             type: string
 *           description: The days of the week the group meets
 *         schedule:
 *           type: string
 *           description: The schedule of the group
 */
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    daysOfWeek: {
        type: [String],
        required: [true, 'Days of the week are required'],
    },
    schedule: {
        type: String,
        required: [true, 'Schedule is required'],
        match: [/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Please enter a valid time range (HH:MM - HH:MM)'],
    }
}, {timestamps: true});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;