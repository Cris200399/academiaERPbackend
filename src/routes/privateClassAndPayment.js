const express = require('express');

const router = express.Router();

const {createPrivateClassAndPayment} = require("../services/privateClassService");

/**
 * @swagger
 * tags:
 *   name: PrivateClassAndPayment
 *   description: Private class and payment management
 */

/**
 * @swagger
 * /api/privateClassAndPayment:
 *   post:
 *     summary: Create a private class and its payment
 *     tags: [PrivateClassAndPayment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateClass:
 *                 $ref: '#/components/schemas/PrivateClass'
 *               payment:
 *                 $ref: '#/components/schemas/PrivateClassPayment'
 *     responses:
 *       201:
 *         description: The private class and payment were successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 privateClass:
 *                   $ref: '#/components/schemas/PrivateClass'
 *                 payment:
 *                   $ref: '#/components/schemas/PrivateClassPayment'
 *       400:
 *         description: Bad request
 */
router.post('/privateClassAndPayment', createPrivateClassAndPayment);


module.exports = router;