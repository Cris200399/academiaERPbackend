const Student = require('../models/student');
const Group = require('../models/group');
const Guardian = require('../models/guardian');

const {formatDate} = require('../utils/utils.js');
const {getAge} = require("../utils/utils");

exports.createStudent = async (studentData) => {
    const {name, lastName, address, gender, dateOfBirth, email, phone, group, dni, guardianData} = studentData;
    let student;
    if (getAge(dateOfBirth) < 18) {
        const guardian = new Guardian(guardianData);
        await guardian.save();

        student = new Student({
            name,
            lastName,
            address,
            gender,
            dateOfBirth,
            email,
            phone,
            group,
            dni,
            guardian: guardian._id
        });
    } else {
        student = new Student({
            name,
            lastName,
            address,
            gender,
            dateOfBirth,
            email,
            phone,
            group,
            dni
        });

    }
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
};

exports.getStudents = async (query) => {
    return Student.find(query).populate('group');
}

exports.updateStudent = async (id, studentData) => {
    const student = await Student.findById(id);
    if (!student) {
        throw new Error('Student not found');
    }


    const oldGroupId = student.group;
    const newGroupId = studentData.group;

    studentData.dateOfBirth = formatDate(studentData.dateOfBirth);

    // Update student data
    Object.assign(student, studentData);
    await student.save();

    // If the group has changed, update the groups
    if (oldGroupId && oldGroupId.toString() !== newGroupId) {
        const oldGroup = await Group.findById(oldGroupId);
        if (oldGroup) {
            oldGroup.members.pull(student._id);
            await oldGroup.save();
        }
    }

    if (newGroupId && oldGroupId.toString() !== newGroupId) {
        const newGroup = await Group.findById(newGroupId);
        if (newGroup) {
            newGroup.members.push(student._id);
            await newGroup.save();
            student.group = newGroupId;
        }
    }

    return student;
}

exports.deleteStudent = async (id) => {
    await Student.findByIdAndDelete(id);
}

exports.getTotalStudents = async () => {
    return Student.countDocuments();
}