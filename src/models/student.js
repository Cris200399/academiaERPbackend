const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - address
 *         - gender
 *         - dateOfBirth
 *         - email
 *         - phone
 *         - dni
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the student
 *         name:
 *           type: string
 *           description: The first name of the student
 *         lastName:
 *           type: string
 *           description: The last name of the student
 *         address:
 *           type: string
 *           description: The address of the student
 *         gender:
 *           type: string
 *           description: The gender of the student
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *         phone:
 *           type: string
 *           description: The phone number of the student
 *         group:
 *           type: string
 *           description: The group id the student belongs to
 *         dni:
 *           type: string
 *           description: The DNI of the student
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the student was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the student was last updated
 */
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    dni: {
        type: String,
        required: [true, 'DNI is required'],
        unique: true
    }
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
