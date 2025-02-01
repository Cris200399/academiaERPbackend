const GroupClassPayment = require('../models/groupClassPayment');
const GroupClass = require('../models/groupClass');
const Student = require('../models/student');

exports.createGroupPayment = async (data) => {
    const {
        student,
        amount,
        date,
        paymentMethod,
        groupClass,
        startDate,
        endDate,
        concept,
        status
    } = data;
    if (!await Student.findById(student)) {
        throw new Error('Student not found');
    }
    if (!await GroupClass.findById(groupClass)) {
        throw new Error('Group not found');
    }
    const groupPayment = new GroupClassPayment({
        student,
        amount,
        date,
        paymentMethod,
        groupClass,
        startDate,
        endDate,
        concept,
        status
    });
    return groupPayment.save();
}

exports.getGroupPayments = async (query) => {
    return GroupClassPayment.find(query);
}

exports.deleteGroupPayment = async (id) => {
    return GroupClassPayment.findByIdAndDelete(id);
}