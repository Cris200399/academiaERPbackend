const express = require('express');

const paymentsReportsController = require('../controllers/paymentsReportsController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: PaymentsReports
 *   description: Payments Reports management
 */

/**
 * @swagger
 * /api/payments-reports/3-latest-months-payments:
 *   get:
 *     summary: Retrieve payments for the last 3 months
 *     tags: [PaymentsReports]
 *     responses:
 *       200:
 *         description: A list of payments for the last 3 months
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad request
 */
router.get('/3-latest-months-payments', paymentsReportsController.get3LatestMonthsPayments);

/**
 * @swagger
 * /api/payments-reports/total-payments-actual-month:
 *   get:
 *     summary: Retrieve total payments for the actual month
 *     tags: [PaymentsReports]
 *     responses:
 *       200:
 *         description: Total payments for the actual month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.get('/total-payments-actual-month', paymentsReportsController.getTotalPaymentsForActualMonth);

module.exports = router;