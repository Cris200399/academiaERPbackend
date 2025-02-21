const express = require('express');

const guardianController = require('../controllers/guardianController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protección de rutas
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Guardians
 *   description: Guardian management endpoints
 */

/**
 * @swagger
 * /api/guardians:
 *   get:
 *     summary: Get all guardians
 *     tags: [Guardians]
 *     responses:
 *       200:
 *         description: List of all guardians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guardian'
 *       400:
 *         description: Error occurred while fetching guardians
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', guardianController.getGuardians);

module.exports = router;