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