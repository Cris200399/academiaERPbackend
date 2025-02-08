const PaymentsReportsService = require('../services/paymentsReportsService');

exports.get3LatestMonthsPayments = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.get3MonthsReportPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalPaymentsForActualMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalPaymentsForActualMonth();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalPaymentsForAMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalPaymentsForAMonth(parseInt(req.params.month));
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}