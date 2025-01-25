const Assistance = require('../models/assistance');
const Group = require('../models/groupClass');
const Student = require('../models/student');


exports.createAssistance = async (data) => {
    const {student, group, date, status} = data;

    const existStudent = await Student.findById(student);
    if (!existStudent) {
        throw new Error('Student not found');
    }

    const existGroup = await Group.findById(group);
    if (!existGroup) {
        throw new Error('Group not found');
    }

    const assistance = new Assistance({
        student,
        group,
        date,
        status,
    });

    return assistance.save();
}

exports.getAssistances = async () => {
    return Assistance.find().populate('student').populate('group');
}

exports.deleteAssistance = async (id) => {
    return Assistance.findByIdAndDelete(id);
}

exports.getAssistance = async (id) => {
    return Assistance.findById(id).populate('student').populate('group');
}

exports.updateAssistance = async (id, data) => {
    const {studentId, groupId, date, status} = data;

    const student = await Student.findById(studentId);
    if (!student) {
        throw new Error('Student not found');
    }

    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }

    const assistance = await Assistance.findById(id);
    if (!assistance) {
        throw new Error('Assistance not found');
    }

    assistance.student = studentId;
    assistance.group = groupId;
    assistance.date = date;
    assistance.status = status;

    return assistance.save();
}

exports.patchAssistanceStatus = async (id, status) => {
    const assistance = await Assistance.findById(id);
    if (!assistance) {
        throw new Error('Assistance not found');
    }

    assistance.status = status;
    return assistance.save();
}

exports.getTodayStudentAssistance = async (studentId, groupId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return Assistance.findOne({
        group: groupId,
        student: studentId,
        date: {
            $gte: today,
            $lt: tomorrow
        }
    }).populate('student').populate('group');
};

exports.getLast30DaysAssistancesPerStudentId = async (studentId) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    return Assistance.find({
        student: studentId,
        date: {
            $gte: last30Days,
            $lt: today
        }
    });
}