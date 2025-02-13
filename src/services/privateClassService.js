const privateClass = require("../models/privateClass");

exports.createPrivateClass = async (data) => {
    const {
        students,
        date,
        startTime,
        endTime
    } = data;

    const newPrivateClass = new privateClass({
        students,
        date,
        startTime,
        endTime
    });
    return newPrivateClass.save();
}

exports.updatePrivateClass = async (id, data) => {
    const {
        students,
        date,
        startTime,
        endTime
    } = data;

    const existingPrivateClass = await privateClass.findById(id);
    if (!existingPrivateClass) {
        throw new Error('Private class not found');
    }

    existingPrivateClass.students = students;
    existingPrivateClass.date = date
    existingPrivateClass.startTime = startTime;
    existingPrivateClass.endTime = endTime;

    return existingPrivateClass.save();
}

exports.getPrivateClasses = async (query) => {
    return privateClass.find(query);
}

exports.getPrivateClassById = async (id) => {
    return privateClass.findById(id);
}

exports.deletePrivateClass = async (id) => {
    return privateClass.findByIdAndDelete(id);
}