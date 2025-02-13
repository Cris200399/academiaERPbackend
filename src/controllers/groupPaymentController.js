const GroupPaymentService = require('../services/groupPaymentService');

exports.createGroupPayment = async (req, res) => {
    try {
        const groupPayment = await GroupPaymentService.createGroupPayment(req.body);
        res.status(201).json(groupPayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroupPayments = async (req, res) => {
    try {
        const groupPayments = await GroupPaymentService.getGroupPayments(req.query);
        res.status(200).json(groupPayments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.deleteGroupPayment = async (req, res) => {
    try {
        await GroupPaymentService.deleteGroupPayment(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getAllGroupPaymentsPerStudent = async (req, res) => {
    try {
        const groupPayments = await GroupPaymentService.getAllGroupPaymentsPerStudent();
        res.status(200).json(groupPayments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.patchGroupPayment = async (req, res) => {
    try {
        const groupPayment = await GroupPaymentService.patchGroupPayment(req.params.id, req.body);
        res.status(200).json(groupPayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroupPaymentsPerStudent = async (req, res) => {
    try {
        const groupPayments = await GroupPaymentService.getGroupPaymentsPerStudent(req.params.studentId);
        res.status(200).json(groupPayments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}