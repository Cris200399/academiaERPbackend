const privateClass = require("../models/privateClass");

exports.createPrivateClass = async (data) => {
    const newPrivateClass = new privateClass(data);
    return newPrivateClass.save();
}

exports.updatePrivateClass = async (id, data) => {

    const existingPrivateClass = await privateClass.findById(id);
    if (!existingPrivateClass) {
        throw new Error('Private class not found');
    }

    for (const key in data) {
        existingPrivateClass[key] = data[key];
    }

    return existingPrivateClass.save();
}

exports.getPrivateClasses = async (query) => {
    return privateClass.find(query).populate('students');
}

exports.getPrivateClassById = async (id) => {
    return privateClass.findById(id);
}

exports.deletePrivateClass = async (id) => {
    return privateClass.findByIdAndDelete(id);
}
