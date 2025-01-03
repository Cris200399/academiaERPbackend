const Student = require('../models/student');

exports.createStudent = async (studentData) => {
    const {name, lastName, address, gender, dateOfBirth, email, phone, group, dni} = studentData;
    const student = new Student({name, lastName, address, gender, dateOfBirth, email, phone, group, dni});
    await student.save();
    return student;
}

exports.getStudents = async (query) => {
    return Student.find(query).populate('group');
}