const PaymentsReportsService = require('../services/paymentsReportsService');

// Group payments reports
exports.get3LatestMonthsGroupsPayments = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.get3MonthsGroupsReportPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalGroupsPaymentsForActualMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalGroupsPaymentsForActualMonth();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalGroupsPaymentsForAMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalGroupsPaymentsForAMonth(parseInt(req.params.month));
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Private class payments reports

exports.get3LatestMonthsPrivateClassesPayments = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.get3MonthsPrivateReportPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalPrivateClassesPaymentsForActualMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalPrivatePaymentsForActualMonth();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalPrivatePaymentsForLastMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalPrivatePaymentsForLastMonth();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getTotalPrivateClassesPaymentsForAMonth = async (req, res) => {
    try {
        const payments = await PaymentsReportsService.getTotalPrivatePaymentsForAMonth(parseInt(req.params.month));
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
