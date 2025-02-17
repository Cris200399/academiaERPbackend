const PrivateClass = require("../models/privateClass");
const {deletePrivateClassPaymentsByPrivateClassId} = require("./privateClassPaymentService");

exports.createPrivateClass = async (data) => {
    const newPrivateClass = new PrivateClass(data);
    return newPrivateClass.save();
}

exports.getPrivateClasses = async (query) => {
    return PrivateClass.find(query);
}

exports.getPrivateClassesWithStudents = async (query) => {
    return PrivateClass.find(query).populate('students');
}

exports.updatePrivateClass = async (id, data) => {

    const existingPrivateClass = await PrivateClass.findById(id);
    if (!existingPrivateClass) {
        throw new Error('Private class not found');
    }

    for (const key in data) {
        existingPrivateClass[key] = data[key];
    }

    return existingPrivateClass.save();
}

exports.patchPrivateClass = async (id, data) => {

    const existingPrivateClass = await PrivateClass.findById(id);
    if (!existingPrivateClass) {
        throw new Error('Private class not found');
    }

    existingPrivateClass.title = data.title;
    existingPrivateClass.date = data.date;
    existingPrivateClass.startTime = data.startTime;
    existingPrivateClass.endTime = data.endTime;

    return existingPrivateClass.save();
}

exports.getPrivateClassById = async (id) => {
    return PrivateClass.findById(id);
}

exports.deletePrivateClass = async (id) => {
    const existingPrivateClass = await PrivateClass.findById(id);
    if (!existingPrivateClass) {
        throw new Error('Private class not found');
    }

    await deletePrivateClassPaymentsByPrivateClassId(id);

    return PrivateClass.findByIdAndDelete(id);
}
