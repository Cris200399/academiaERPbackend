const PrivateClassPayment = require("../models/privateClassPayment");
const PrivateClass = require("../models/privateClass");


exports.createPrivateClassPayment = async (data) => {
    const {
        student,
        amount,
        date,
        privateClass,
        paymentMethod
    } = data;

    const newPrivateClassPayment = new PrivateClassPayment({
        student,
        amount,
        date,
        privateClass,
        paymentMethod
    });
    return newPrivateClassPayment.save();
}

exports.getPrivateClassPayments = async (query) => {
    return PrivateClassPayment.find(query);
}

exports.deletePrivateClassPayment = async (id) => {
    const existingPrivateClassPayment = await PrivateClassPayment.findById(id);
    if (!existingPrivateClassPayment) {
        throw new Error('Private class payment not found');
    }

    const existingPrivateClass = await PrivateClass.findById(existingPrivateClassPayment.privateClass);
    if (existingPrivateClass) {
        // Remove the student from the private class
        existingPrivateClass.students = existingPrivateClass.students.filter(
            studentId => studentId.toString() !== existingPrivateClassPayment.student.toString()
        );
        await existingPrivateClass.save();
    }


    return PrivateClassPayment.findByIdAndDelete(id);
}

exports.deletePrivateClassPaymentsByPrivateClassId = async (privateClassId) => {
    return PrivateClassPayment.deleteMany({privateClass: privateClassId});
}