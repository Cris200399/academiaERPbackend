const express = require('express');

const groupPaymentController = require('../controllers/groupPaymentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: GroupPayment
 *  description: GroupPayment management
 */


/**
 * @swagger
 * /group-payments:
 *   post:
 *     summary: Create a new group payment
 *     tags: [GroupPayment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: string
 *                 description: The ID of the student
 *               amount:
 *                 type: number
 *                 description: The amount of the payment
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the payment
 *               paymentMethod:
 *                 type: string
 *                 description: The method of payment
 *               groupClass:
 *                 type: string
 *                 description: The ID of the group class
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the group class
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the group class
 *               description:
 *                 type: string
 *                 description: A description of the payment
 *               status:
 *                 type: string
 *                 description: The status of the payment
 *     responses:
 *       201:
 *         description: The group payment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupPayment'
 *       400:
 *         description: Bad request
 */
router.post('/', groupPaymentController.createGroupPayment);


/**
 * @swagger
 * /group-payments:
 *   get:
 *     summary: Retrieve a list of group payments
 *     tags: [GroupPayment]
 *     parameters:
 *       - in: query
 *         name: student
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: groupClass
 *         schema:
 *           type: string
 *         description: The ID of the group class
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: The status of the payment
 *     responses:
 *       200:
 *         description: A list of group payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupPayment'
 *       400:
 *         description: Bad request
 */
router.get('/', groupPaymentController.getGroupPayments);

module.exports = router;