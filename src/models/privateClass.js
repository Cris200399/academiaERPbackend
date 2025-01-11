const mongoose = require('mongoose');

const privateClassSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required'],
    },
    date: {
        type: Date, // Fecha de la clase particular.
        required: [true, 'Date is required'],
    },
    time: {
        type: String, // Hora de la clase (ejemplo: "15:00 - 16:00").
        required: [true, 'Time is required'],
        match: [/^\d{2}:\d{2} - \d{2}:\d{2}$/, 'Please enter a valid time range (HH:MM - HH:MM)'],
    },
    price: {
        type: Number, // Precio de la clase particular.
        required: [true, 'Price is required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('PrivateClass', privateClassSchema);
