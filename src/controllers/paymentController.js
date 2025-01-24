const PaymentService = require('../services/paymentService');

exports.createPayment = async (req, res) => {
    try {
        const payment = await PaymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getPayments = async (req, res) => {
    try {
        const payments = await PaymentService.getPayments(req.query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getGroupPayments = async (req, res) => {
    try {
        const payments = await PaymentService.getGroupPayments(req.query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getPrivatePayments = async (req, res) => {
    try {
        const payments = await PaymentService.getPrivatePayments(req.query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}