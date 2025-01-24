const Payment = require('../models/payment');
const GroupClassPayment = require('../models/groupClassPayment');
const PrivateClassPayment = require('../models/privateClassPayment');
const Student = require('../models/student');
const paymentTypes = require("../constants/paymentTypes");

//JSON to create a group payment
// {
//     "student": "60d0fe4f5311236168a109ca",
//     "type": "group",
//     "amount": 100,
//     "date": "2024-02-01",
//     "groupPayment": {
//         "group": "60d0fe4f5311236168a109cb",
//         "startDate": "2024-02-01",
//         "endDate": "2025-03-01"
//     },
//     "paymentMethod": ["efectivo", "yape"],
//     "description": "January group payment"
// }

//JSON to create a private payment
// {
//     "student": "60d0fe4f5311236168a109ca",
//     "type": "private",
//     "amount": 50,
//     "date": "2024-02-01",
//     "privatePayment": {
//         "date": "2024-02-01"
//         "startTime": "08:00",
//         "endTime": "09:00"
//     },
//     "paymentMethod": ["efectivo", "yape"],
//     "description": "January private class payment"
// }
exports.createPayment = async (data) => {
    const {
        student,
        type,
        amount,
        date,
        paymentMethod,
        description,
        status
    } = data;

    const studentExists = await Student.findById(student);
    if (!studentExists) {
        throw new Error('Student not found');
    }

    // Check if the class is for a group
    if (type === paymentTypes[0]) {
        const {groupPayment} = data;
        const newGroupPayment = await GroupClassPayment.create(groupPayment);

        return await Payment.create({
            student,
            type,
            amount,
            date,
            paymentMethod,
            description,
            status,
            groupPayment: newGroupPayment._id
        });
    }

    // Check if the class is for a private class
    if (type === paymentTypes[1]) {
        const {privatePayment} = data;
        const newPrivatePayment = await PrivateClassPayment.create(privatePayment);

        return await Payment.create({
            student,
            type,
            amount,
            date,
            paymentMethod,
            description,
            status,
            privatePayment: newPrivatePayment._id
        });

    }
}

exports.getPayments = async (query) => {
    return Payment.find(req.query)
        .populate({
            path: 'groupPayment',
            populate: {path: 'group'},
            match: {type: 'grupal'} // Only populate if type is 'grupal'
        })
        .populate({
            path: 'privatePayment',
            populate: {path: 'privateClass'},
            match: {type: 'particular'} // Only populate if type is 'particular'
        });
}

exports.getGroupPayments = async (query) => {
    return Payment.find({type: 'grupal', ...query}).populate('groupPayment');
}

exports.getPrivatePayments = async (query) => {
    return Payment.find({type: 'particular', ...query}).populate('privatePayment');
}
