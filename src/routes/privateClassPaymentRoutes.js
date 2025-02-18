const express = require('express');

const PrivateClassPaymentController = require('../controllers/privateClassPaymentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PrivateClassPayments
 *   description: API for managing private class payments
 */

/**
 * @swagger
 * /api/private-class-payments:
 *   post:
 *     summary: Create a new private class payment
 *     tags: [PrivateClassPayments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateClassPayment'
 *     responses:
 *       201:
 *         description: The private class payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all private class payments
 *     tags: [PrivateClassPayments]
 *     parameters:
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: privateClass
 *         schema:
 *           type: string
 *         description: The ID of the private class
 *     responses:
 *       200:
 *         description: A list of private class payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 */
router.post('/', PrivateClassPaymentController.createPrivatePayment);


/**
 * @swagger
 * /api/private-class-payments:
 *   get:
 *     summary: Get all private class payments
 *     tags: [PrivateClassPayments]
 *     parameters:
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: privateClass
 *         schema:
 *           type: string
 *         description: The ID of the private class
 *     responses:
 *       200:
 *         description: A list of private class payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 */
router.get('/', PrivateClassPaymentController.getPrivatePayments);

/**
 * @swagger
 * /api/private-class-payments/{id}:
 *   delete:
 *     summary: Delete a private class payment by ID
 *     tags: [PrivateClassPayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the private class payment
 *     responses:
 *       204:
 *         description: Private class payment successfully deleted
 *       400:
 *         description: Bad request
 */
router.delete('/:id', PrivateClassPaymentController.deletePrivatePayment);

module.exports = router;