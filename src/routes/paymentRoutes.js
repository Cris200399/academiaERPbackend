const {createPayment, getPayments, getGroupPayments, getPrivatePayments} = require('../controllers/paymentController');

const express = require('express');
const {deletePayment, updatePayment} = require("../services/paymentService");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
router.post('/', createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Retrieve a list of payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
router.get('/', getPayments);

/**
 * @swagger
 * /api/payments/group:
 *   get:
 *     summary: Retrieve a list of group payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of group payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
router.get('/group', getGroupPayments);

/**
 * @swagger
 * /api/payments/private:
 *   get:
 *     summary: Retrieve a list of private payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of private payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 */
router.get('/private', getPrivatePayments);
router.get('/private', getPrivatePayments);

module.exports = router;