const Student = require('../models/student');
const Group = require('../models/groupClass');
const Guardian = require('../models/guardian');

const {formatDate} = require('../utils/utils.js');
const {getAge} = require("../utils/utils");

const gridFSService = require('../services/gridfsService');
const {removeStudentFromGroup} = require("./groupClassService");

exports.createStudent = async (studentData) => {
    const {name, lastName, address, gender, dateOfBirth, email, phone, group, dni, guardian} = studentData;
    let student;
    if (getAge(dateOfBirth) < 18) {
        const newGuardian = new Guardian(guardian);
        await newGuardian.save();

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
            guardian: newGuardian._id
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
        if (groupDoc && groupDoc.members.length < groupDoc.maxMembers) {
            groupDoc.members.push(student._id);
            await groupDoc.save();
            student.group = groupDoc;
        } else {
            throw new Error('Group not found or group is full');
        }
    }
    return student;
};

exports.getStudents = async (query) => {
    return Student.find(query).populate('group').populate('guardian');
}

exports.getStudent = async (id) => {
    return Student.findById(id).populate('group').populate('guardian');
}

exports.updateStudent = async (id, studentData) => {
    const existStudent = await Student.findById(id);
    if (!existStudent) {
        throw new Error('Student not found');
    }

    const oldGroupId = existStudent.group;
    const newGroupId = studentData.group;

    const newGroup = await Group.findById(newGroupId);
    const oldGroup = oldGroupId ? await Group.findById(oldGroupId) : null;

    if (newGroupId && (!oldGroupId || oldGroupId.toString() !== newGroupId)) {
        if (newGroup && newGroup.members.length < newGroup.maxMembers) {
            newGroup.members.push(existStudent._id);
            await newGroup.save();
            if (oldGroup) {
                oldGroup.members = oldGroup.members.filter(member => member.toString() !== existStudent._id.toString());
                await oldGroup.save();
            }
            existStudent.group = newGroupId;
        } else {
            throw new Error('Group not found or group is full');
        }
    }

    if (getAge(studentData.dateOfBirth) < 18) {
        const existGuardian = await Guardian.findById(existStudent.guardian._id);
        if (existGuardian) {
            await existGuardian.updateOne(studentData.guardian);
            studentData.guardian = existGuardian._id;
        } else {
            const guardian = new Guardian(studentData.guardian);
            await guardian.save();
            studentData.guardian = guardian._id;
        }
    }

    if (existStudent.profileImageId) {
        studentData.profileImageId = existStudent.profileImageId;
    }

    if (existStudent.documentId) {
        studentData.documentId = existStudent.documentId;
    }

    await existStudent.updateOne(studentData);

    return Student.findById(existStudent._id).populate('guardian').populate('group');
}

exports.deleteStudent = async (id) => {
    const existGroup = await Group.findOne({members: id});
    if (existGroup) {
        existGroup.members = existGroup.members.filter(member => member.toString() !== id);
        await existGroup.save();
    }
    const student = await Student.findByIdAndDelete(id);
    if (student && student.profileImageId) {
        await gridFSService.deleteImageFile(student.profileImageId);
    }
    if (student && student.documentId) {
        await gridFSService.deleteDocumentFile(student.documentId);
    }
}

exports.getTotalStudents = async () => {
    return Student.countDocuments();
}

exports.deleteProfileImage = async (id) => {
    try {
        const student = await Student.findById(id);
        if (!student) {
            throw new Error('Estudiante no encontrado');
        }
        if (!student.profileImageId) {
            throw new Error('No hay imagen de perfil');
        }
        await gridFSService.deleteImageFile(student.profileImageId);
        student.profileImageId = undefined;
        await student.save();
        return student;
    } catch (error) {
        throw new Error('Error al eliminar la imagen de perfil: ' + error.message);
    }
}

exports.updateProfileImage = async (id, imageFile) => {
    try {
        const student = await Student.findById(id);

        if (!student) {
            throw new Error('Estudiante no encontrado');
        }

        // Eliminar imagen anterior si existe
        if (student.profileImageId) {
            await gridFSService.deleteImageFile(student.profileImageId);
        }

        // Subir nueva imagen
        // Actualizar referencia en el estudiante
        student.profileImageId = await gridFSService.uploadImageFile(imageFile);
        return await student.save();
    } catch (error) {
        throw new Error('Error al actualizar la imagen de perfil: ' + error.message);
    }
}

exports.updateDocumentFile = async (id, documentFile) => {
    try {

        const student = await Student.findById(id);
        if (!student) {
            throw new Error('Estudiante no encontrado');
        }

        // Eliminar documento anterior si existe
        if (student.documentId) {
            await gridFSService.deleteDocumentFile(student.documentId);
        }

        // Subir nuevo documento
        const fileId = await gridFSService.uploadDocumentFile(documentFile);
        student.documentId = fileId;
        await student.save();

        return student;
    } catch (error) {
        throw new Error('Error al actualizar el documento: ' + error.message);
    }
}

exports.changeStudentStatus = async (id, status) => {
    const student = await Student.findById(id);
    if (!student) {
        throw new Error('Estudiante no encontrado');
    }
    student.status = status;
    if (status === 'inactivo' && student.group) {
        //Remove Student from Group
        const group = await removeStudentFromGroup(student.group, id);
        student.group = undefined;
    }

    return student.save();
}

exports.getTotalOverdueStudents = async () => {
    return Student.countDocuments({paymentStatus: 'vencido'});
}

exports.getTotalStudentsAboutToExpire = async () => {
    return Student.countDocuments({paymentStatus: 'por_vencer'});
};