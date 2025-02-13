const express = require('express');

const privatePaymentController = require('../controllers/privatePaymentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PrivateClassAndPayment
 *   description: PrivatePayment management
 */

/**
 * @swagger
 * /api/private-class:
 *   post:
 *     summary: Create a new private payment
 *     tags: [PrivateClassAndPayment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateClassPayment'
 *     responses:
 *       201:
 *         description: Private payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 */
router.post('/', privatePaymentController.createPrivatePayment);

/**
 * @swagger
 * /api/private-class:
 *   get:
 *     summary: Retrieve a list of private payments
 *     tags: [PrivateClassAndPayment]
 *     responses:
 *       200:
 *         description: A list of private payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 */
router.get('/', privatePaymentController.getPrivatePayments);

module.exports = router;