const StudentService = require('../services/studentService');
const Student = require("../models/student");
const gridFSService = require("../services/gridfsService")

exports.createStudent = async (req, res) => {
    try {
        const student = await StudentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await StudentService.getStudents(req.query);
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalStudents = async (req, res) => {
    try {
        const students = await StudentService.getTotalStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const student = await StudentService.updateStudent(req.params.id, req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        await StudentService.deleteStudent(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


exports.updateProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: 'No se proporcionó ninguna imagen'});
        }
        const studentUpdated = await StudentService.updateProfileImage(req.params.studentId, req.file);
        res.status(200).json({message: 'Profile image updated', studentUpdated});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error updating profile image'});
    }
};

exports.getProfileImage = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student || !student.profileImageId) {
            return res.status(404).json({message: 'Imagen no encontrada'});
        }

        const file = await gridFSService.getFile(student.profileImageId);
        if (!file) {
            return res.status(404).json({message: 'Archivo no encontrado'});
        }

        res.set('Content-Type', file.contentType);
        const downloadStream = gridFSService.getDownloadStream(student.profileImageId);
        downloadStream.pipe(res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

