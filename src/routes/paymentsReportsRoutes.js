const express = require('express');

const paymentsReportsController = require('../controllers/paymentsReportsController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protección de rutas
router.use(authMiddleware);


/**
 * @swagger
 * tags:
 *   name: PaymentsReports
 *   description: Payments Reports management
 */

/**
 * @swagger
 * /api/payments-reports/group-3-latest-months-payments:
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
router.get('/group-3-latest-months-payments', paymentsReportsController.get3LatestMonthsGroupsPayments);

/**
 * @swagger
 * /api/payments-reports/group-total-payments-actual-month:
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
router.get('/group-total-payments-actual-month', paymentsReportsController.getTotalGroupsPaymentsForActualMonth);

/**
 * @swagger
 * /api/payments-reports/group-total-payments-month/{month}:
 *   get:
 *     summary: Retrieve total payments for a specific month
 *     tags: [PaymentsReports]
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: The month for which to retrieve total payments (0-11)
 *     responses:
 *       200:
 *         description: Total payments for the specified month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.get('/group-total-payments-month/:month', paymentsReportsController.getTotalGroupsPaymentsForAMonth);

/**
 * @swagger
 * /api/payments-reports/private-3-latest-months-payments:
 *   get:
 *     summary: Retrieve private class payments for the last 3 months
 *     tags: [PaymentsReports]
 *     responses:
 *       200:
 *         description: A list of private class payments for the last 3 months
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad request
 */
router.get('/private-3-latest-months-payments', paymentsReportsController.get3LatestMonthsPrivateClassesPayments);

/**
 * @swagger
 * /api/payments-reports/private-total-payments-actual-month:
 *   get:
 *     summary: Retrieve total private class payments for the actual month
 *     tags: [PaymentsReports]
 *     responses:
 *       200:
 *         description: Total private class payments for the actual month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.get('/private-total-payments-actual-month', paymentsReportsController.getTotalPrivateClassesPaymentsForActualMonth);

/**
 * @swagger
 * /api/payments-reports/private-total-payments-last-month:
 *   get:
 *     summary: Retrieve total private class payments for the last month
 *     tags: [PaymentsReports]
 *     responses:
 *       200:
 *         description: Total private class payments for the last month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.get('/private-total-payments-last-month', paymentsReportsController.getTotalPrivatePaymentsForLastMonth);

/**
 * @swagger
 * /api/payments-reports/private-total-payments-month/{month}:
 *   get:
 *     summary: Retrieve total private class payments for a specific month
 *     tags: [PaymentsReports]
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: The month for which to retrieve total payments (0-11)
 *     responses:
 *       200:
 *         description: Total private class payments for the specified month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 */
router.get('/private-total-payments-month/:month', paymentsReportsController.getTotalPrivateClassesPaymentsForAMonth);

module.exports = router;