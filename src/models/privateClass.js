// src/models/privateClass.js
const mongoose = require('mongoose');

const privateClass = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 2']
    }],
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        match: [/^\d{2}:\d{2}$/, 'Please enter a valid start time (HH:MM)'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: [/^\d{2}:\d{2}$/, 'Please enter a valid end time (HH:MM)'],
    }
}, {timestamps: true});

function arrayLimit(val) {
    return val.length <= 2;
}

module.exports = mongoose.model('PrivateClass', privateClass);