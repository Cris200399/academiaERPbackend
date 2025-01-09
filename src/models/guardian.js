const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    relationship: {
        type: String,
        required: [true, 'Relationship is required'],
    }
}, {timestamps: true});

const Guardian = mongoose.model('Guardian', guardianSchema);
module.exports = Guardian;