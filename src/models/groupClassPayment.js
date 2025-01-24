const mongoose = require('mongoose');


const groupClassPaymentSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: [true, 'Group is required'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
    }
}, {timestamps: true});

module.exports = mongoose.model('GroupClassPayment', groupClassPaymentSchema);