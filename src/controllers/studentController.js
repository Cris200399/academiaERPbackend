const StudentService = require('../services/studentService');

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