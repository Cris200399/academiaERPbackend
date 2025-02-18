const GroupClassPayment = require('../models/groupClassPayment');

const PrivateClassPayment = require('../models/privateClassPayment');

// Group payments reports
exports.get3MonthsGroupsReportPayments = async () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
    const payments = await GroupClassPayment.aggregate([
        {$match: {date: {$gte: threeMonthsAgo}}},
        {
            $group: {
                _id: {$month: "$date"},
                totalPayments: {$sum: "$amount"}
            }
        },
        {$sort: {_id: 1}}
    ]);
    return payments;
}

exports.getTotalGroupPaymentsForLastMonth = async () => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const payments = await GroupClassPayment.aggregate([
        {$match: {date: {$gte: lastMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
    return payments;
}

exports.getTotalGroupsPaymentsForActualMonth = async () => {
    const today = new Date();
    const actualMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const payments = await GroupClassPayment.aggregate([
        {$match: {date: {$gte: actualMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
    return payments[0];
}

exports.getTotalGroupsPaymentsForAMonth = async (month) => {
    const today = new Date();
    const actualMonth = new Date(today.getFullYear(), month, 1);
    const nextMonth = new Date(today.getFullYear(), month + 1, 1);
    const payments = await GroupClassPayment.aggregate([
        {$match: {date: {$gte: actualMonth, $lt: nextMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
    return payments[0] ? payments[0] : {totalPayments: 0};
}

// Private payments reports
exports.get3MonthsPrivateReportPayments = async () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
    return PrivateClassPayment.aggregate([
        {$match: {date: {$gte: threeMonthsAgo}}},
        {
            $group: {
                _id: {$month: "$date"},
                totalPayments: {$sum: "$amount"}
            }
        },
        {$sort: {_id: 1}}
    ]);
}

exports.getTotalPrivatePaymentsForLastMonth = async () => {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    return PrivateClassPayment.aggregate([
        {$match: {date: {$gte: lastMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
}

exports.getTotalPrivatePaymentsForActualMonth = async () => {
    const today = new Date();
    const actualMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return PrivateClassPayment.aggregate([
        {$match: {date: {$gte: actualMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
}

exports.getTotalPrivatePaymentsForAMonth = async (month) => {
    const today = new Date();
    const actualMonth = new Date(today.getFullYear(), month, 1);
    const nextMonth = new Date(today.getFullYear(), month + 1, 1);
    return PrivateClassPayment.aggregate([
        {$match: {date: {$gte: actualMonth, $lt: nextMonth}}},
        {
            $group: {
                _id: null,
                totalPayments: {$sum: "$amount"}
            }
        }
    ]);
}
