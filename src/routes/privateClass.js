const express = require('express');

const privatePaymentController = require('../controllers/privatePaymentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PrivateClass
 *   description: PrivatePayment management
 */


/**
 * @swagger
 * /api/private-class:
 *   post:
 *     summary: Create a new private class and payment
 *     tags: [PrivatePayment]
 *     responses:
 *       201:
 *         description: A private class and payment
 *       400:
 *         description: Bad request
 */
router.post('/', privatePaymentController.createPrivatePayment);

/**
 * @swagger
 * /api/private-class:
 *   get:
 *     summary: Retrieve all private payments
 *     tags: [PrivatePayment]
 *     responses:
 *       200:
 *         description: A list of private payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivatePayment'
 *       400:
 *         description: Bad request
 */
router.get('/', privatePaymentController.getPrivatePayments);

module.exports = router;