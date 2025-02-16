const {createPrivateClass} = require("./privateClassService");
const PrivateClassPayment = require("../models/privateClassPayment");


exports.createPrivateClassAndPayment = async (data) => {
    const {privateClass, privatePayment} = data;
    const newPrivateClass = await createPrivateClass(privateClass);
    for (const studentId in newPrivateClass.students) {
        const newPrivateClassPayment = new PrivateClassPayment({
            student: studentId,
            amount: privatePayment.amount,
            date: privatePayment.date,
            privateClass: newPrivateClass._id,
            paymentMethod: privatePayment.paymentMethod,
            description: privatePayment.description
        });
    }
}