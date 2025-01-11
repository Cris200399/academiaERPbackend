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

exports.updatePayment = async (req, res) => {
    try {
        const payment = await PaymentService.updatePayment(req.params.id, req.body);
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.deletePayment = async (req, res) => {
    try {
        const payment = await PaymentService.deletePayment(req.params.id);
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}