const privateClass = require("../models/privateClass");

exports.createPrivateClass = async (data) => {
    const {
        students,
        date,
        startTime,
        endTime
    } = data;

    const privateClass = new privateClass({
        students,
        date,
        startTime,
        endTime
    });
    return privateClass.save();
}

exports.getPrivateClasses = async (query) => {
    return privateClass.find(query);
}

exports.getPrivateClassById = async (id) => {
    return privateClass.findById(id);
}