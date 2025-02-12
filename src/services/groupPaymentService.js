const GroupClassPayment = require('../models/groupClassPayment');
const GroupClass = require('../models/groupClass');
const Student = require('../models/student');
const {updateStudentPaymentStatus} = require("../jobs/updateStudentsPaymentStatus");

exports.createGroupPayment = async (data) => {
    const {
        student,
        amount,
        date,
        paymentMethod,
        groupClass,
        startDate,
        endDate,
        concept
    } = data;
    const existStudent = await Student.findById(student);
    if (!existStudent) {
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
        concept
    });

    await groupPayment.save();
    await updateStudentPaymentStatus(new Date, existStudent);

    return groupPayment;
}

exports.getGroupPayments = async (query) => {
    return GroupClassPayment.find(query);
}

exports.deleteGroupPayment = async (id) => {
    const existGroupClassPayment = await GroupClassPayment.findById(id);
    const student = await Student.findById(existGroupClassPayment.student);

    const deletedGroupClassPayment =  await GroupClassPayment.findByIdAndDelete(id);
    await updateStudentPaymentStatus(new Date, student);
    return deletedGroupClassPayment;
}

exports.getAllGroupPaymentsPerStudent = async () => {
    const allStudents = await Student.find({}, 'name lastName _id paymentStatus group');
    return await Promise.all(allStudents.map(async (student) => {
        const groupPayments = await GroupClassPayment.find({student: student._id}, 'amount date paymentMethod startDate endDate concept');
        const groupName = await GroupClass.findOne({_id: student.group}, 'name');
        return {
            ...student.toObject(),
            group: groupName,
            groupPayments: groupPayments
        };
    }));
}