const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const PrivateClassAndPayments = require("../controllers/privateClassAndPaymentController");

// Protección de rutas
router.use(authMiddleware);


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
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: object
 *         required: false
 *         description: Query parameters to filter private classes
 *     responses:
 *       200:
 *         description: A list of private classes and their payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 */
router.get('/', PrivateClassAndPayments.getPrivateClassAndTheirPayments);

/**
 * @swagger
 * /api/private-class-and-payments/coming:
 *   get:
 *     summary: Retrieve upcoming private classes and their payments
 *     tags: [PrivateClassAndPayment]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: object
 *         required: false
 *         description: Query parameters to filter upcoming private classes
 *     responses:
 *       200:
 *         description: A list of upcoming private classes and their payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 */
router.get('/coming', PrivateClassAndPayments.getComingPrivateClassAndTheirPayments);

module.exports = router;