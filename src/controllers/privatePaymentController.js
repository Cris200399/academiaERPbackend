const PrivatePaymentService = require('../services/privateClassPaymentService');

exports.createPrivatePayment = async (req, res) => {
    try {
        const privatePayment = await PrivatePaymentService.createPrivateClassPayment(req.body);
        res.status(201).json(privatePayment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getPrivatePayments = async (req, res) => {
    try {
        const privatePayments = await PrivatePaymentService.getPrivateClassPayments(req.query);
        res.status(200).json(privatePayments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}