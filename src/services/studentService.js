const Student = require('../models/student');
const Group = require('../models/group');

exports.createStudent = async (studentData) => {
    const {name, lastName, address, gender, dateOfBirth, email, phone, group, dni} = studentData;
    const student = new Student({name, lastName, address, gender, dateOfBirth, email, phone, group, dni});
    await student.save();
    if (group) {
        const groupDoc = await Group.findById(group);
        if (groupDoc) {
            groupDoc.members.push(student._id);
            await groupDoc.save();
            student.group = groupDoc;
        }
    }
    return student;
}

exports.getStudents = async (query) => {
    return Student.find(query).populate('group');
}

exports.updateStudent = async (id, studentData) => {
    const student = await Student.findById(id);
    if (!student) {
        throw new Error('Student not found');
    }

    Object.assign(student, studentData);
    await student.save();
    return student;
}

exports.deleteStudent = async (id) => {
    await Student.findByIdAndDelete(id);
}

exports.getTotalStudents = async () => {
    return Student.countDocuments();
}