const Payment = require('../models/payment');
const Student = require('../models/student');
const {formatDate} = require("../utils/utils");


exports.createPayment = async (paymentData) => {
    const {student, type, amount, startDate, endDate, group, privateClass, paymentMethod, description} = paymentData;

    const existStudent = await Student.findById(student);
    if (!existStudent) {
        throw new Error('Student not found');
    }

    formatDate(startDate);
    formatDate(endDate);

    const payment = new Payment({
        student,
        type,
        amount,
        startDate,
        endDate,
        group,
        privateClass,
        paymentMethod,
        description
    });
    await payment.save();
    if (endDate < new Date()) {
        await existStudent.updateOne({$set: {paymentStatus: 'overdue'}});
    } else {
        await existStudent.updateOne({$set: {paymentStatus: 'up-to-date'}});
    }
    return payment;

}

exports.updatePayment = async (paymentId, paymentData) => {
    const {student, type, amount, startDate, endDate, group, privateClass, paymentMethod, description} = paymentData;

    const existPayment = await Payment.findById(paymentId);
    if (!existPayment) {
        throw new Error('Payment not found');
    }

    const existStudent = await Student.findById(student);
    if (!existStudent) {
        throw new Error('Student not found');
    }

    formatDate(startDate);
    formatDate(endDate);

    await existPayment.updateOne({
        student,
        type,
        amount,
        startDate,
        endDate,
        group,
        privateClass,
        paymentMethod,
        description
    });

    if (endDate < new Date()) {
        await existStudent.updateOne({$set: {paymentStatus: 'overdue'}});
    } else {
        await existStudent.updateOne({$set: {paymentStatus: 'up-to-date'}});
    }

    return await Payment.findById(paymentId);
}

exports.deletePayment = async (paymentId) => {
    const existPayment = await Payment.findById(paymentId);
    if (!existPayment) {
        throw new Error('Payment not found');
    }
    await existPayment.remove();
    return existPayment;
}

exports.getPayments = async (query) => {
    return Payment.find(query).populate('student');
}

exports.getOverduePayments = async () => {
    const now = new Date();
    return Payment.find({endDate: {$lt: now}});
}

exports.getOverduePaymentByUserId = async (userId) => {
    const now = new Date();
    return Payment.find({student: userId, endDate: {$lt: now}});
}
