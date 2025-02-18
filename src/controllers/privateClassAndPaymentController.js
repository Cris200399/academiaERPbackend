const PrivateClassAndPaymentService = require('../services/privateClassAndPaymentServiceRoutes');

exports.getPrivateClassAndTheirPayments = async (req, res) => {
    try {
        const privateClassesWithPayments = await PrivateClassAndPaymentService.getPrivateClassAndTheirPrivatePayments(req.query);
        res.json(privateClassesWithPayments);
    } catch (error) {
        console.error('Error getting private class and their payments:', error);
        res.status(500).json({message: 'Error getting private class and their payments'});
    }
}

exports.getComingPrivateClassAndTheirPayments = async (req, res) => {
    try {
        const privateClassesWithPayments = await PrivateClassAndPaymentService.getComingPrivateClassAndTheirPrivatePayments(req.query);
        res.json(privateClassesWithPayments);
    } catch (error) {
        console.error('Error getting coming private class and their payments:', error);
        res.status(500).json({message: 'Error getting coming private class and their payments'});
    }
}