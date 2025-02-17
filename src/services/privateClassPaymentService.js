const PrivateClassPayment = require("../models/privateClassPayment");


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
    return PrivateClassPayment.findByIdAndDelete(id);
}

exports.deletePrivateClassPaymentsByPrivateClassId = async (privateClassId) => {
    return PrivateClassPayment.deleteMany({privateClass: privateClassId});
}