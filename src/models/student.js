const mongoose = require('mongoose');
const {genderOptions} = require("../constants/genderOptions");

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
 *         name:
 *           type: string
 *           description: Nombre del estudiante
 *         lastName:
 *           type: string
 *           description: Apellido del estudiante
 *         address:
 *           type: string
 *           description: Dirección del estudiante
 *         gender:
 *           type: string
 *           description: Género del estudiante
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del estudiante
 *         email:
 *           type: string
 *           description: Correo electrónico del estudiante
 *         phone:
 *           type: string
 *           description: Teléfono del estudiante
 *         group:
 *           type: string
 *           description: Referencia al grupo al que pertenece el estudiante
 *         dni:
 *           type: string
 *           description: Documento Nacional de Identidad del estudiante
 *         guardian:
 *           type: string
 *           description: Referencia al tutor del estudiante (se agrega si el estudiante es menor de edad)
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
        enum: genderOptions,
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
        unique: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    dni: {
        type: String,
        required: [true, 'DNI is required'],
        unique: true
    },
    guardian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guardian',
    },
    profileImageId: { // Referencia al archivo de imagen en GridFS
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads'
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    paymentStatus: {
        type: String,
        enum: ['sin_pago','al_día', 'por_vencer', 'vencido'],
        default: 'sin_pago'
    }
}, {timestamps: true});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
