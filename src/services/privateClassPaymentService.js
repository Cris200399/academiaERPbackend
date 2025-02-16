const PrivateClassPayment = require("../models/privateClassPayment");


exports.createPrivateClassPayment = async (data) => {
    const {
        student,
        amount,
        date,
        privateClass,
        paymentMethod,
        description,
    } = data;

    const newPrivateClassPayment = new PrivateClassPayment({
        student,
        amount,
        date,
        privateClass,
        paymentMethod,
        description
    });
    return newPrivateClassPayment.save();
}

exports.getPrivateClassPayments = async (query) => {
    return PrivateClassPayment.find(query);
}