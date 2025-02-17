const express = require('express');

const router = express.Router();

const PrivateClassAndPayments = require("../controllers/privateClassAndPaymentController");

/**
 * @swagger
 * tags:
 *   name: PrivateClassAndPayment
 *   description: Private class and payment management
 */

/**
 * @swagger
 * /api/private-class-and-payments:
 *   get:
 *     summary: Retrieve private classes and their payments
 *     tags: [PrivateClassAndPayment]
 *     responses:
 *       200:
 *         description: A list of private classes and their payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Bad request
 */
router.get('/', PrivateClassAndPayments.getPrivateClassAndTheirPayments);

module.exports = router;