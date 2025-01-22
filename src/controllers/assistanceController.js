const AssistanceService = require("../services/assistanceService");

exports.createAssistance = async (req, res) => {
    try {
        const assistance = await AssistanceService.createAssistance(req.body);
        res.status(201).json(assistance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getAssistances = async (req, res) => {
    try {
        const assistances = await AssistanceService.getAssistances();
        res.json(assistances);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateAssistance = async (req, res) => {
    try {
        const assistance = await AssistanceService.updateAssistance(req.params.id, req.body);
        res.json(assistance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.patchAssistanceStatus = async (req, res) => {
    try {
        const assistance = await AssistanceService.patchAssistanceStatus(req.params.id, req.body.status);
        res.json(assistance);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTodayAssistancePerStudent = async (req, res) => {
    try {
        const { studentId, groupId } = req.query; // Obtener los parámetros de la URL
        const assistance = await AssistanceService.getCurrentAssistance(studentId, groupId);
        res.json(assistance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}