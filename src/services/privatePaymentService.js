const Student = require("../models/student");
const PrivateClass = require("../models/privateClass");
const PrivateClassPayment = require("../models/privateClassPayment");


exports.createPrivateClassPayment = async (data) => {
    const {
        student,
        amount,
        date,
        paymentMethod,
        privateClass,
        startDate,
        endDate,
        description,
        status
    } = data;
    if (!await Student.findById(student)) {
        throw new Error('Student not found');
    }

    const newPrivateClass = new PrivateClass({
        privateClass
    })
    await newPrivateClass.save();


    const privateClassPayment = new PrivateClassPayment({
        student: student,
        amount: amount,
        date: date,
        privateClass: newPrivateClass._id,
        paymentMethod: paymentMethod,
        startDate: startDate,
        endDate: endDate,
        description: description,
        status: status
    });
    return privateClassPayment.save();
}

exports.getPrivateClassPayments = async (query) => {
    return PrivateClassPayment.find(query);
}