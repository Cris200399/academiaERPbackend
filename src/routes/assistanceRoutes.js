const express = require('express');

const {
    createAssistance,
    getAssistances,
    updateAssistance,
    patchAssistanceStatus,
    getTodayAssistancePerStudent
} = require('../controllers/assistanceController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assistance
 *   description: Assistance management
 */

/**
 * @swagger
 * /api/assistances:
 *   post:
 *     summary: Create a new assistance
 *     tags: [Assistance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assistance'
 *     responses:
 *       201:
 *         description: Assistance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 */
router.post('/', createAssistance);

/**
 * @swagger
 * /api/assistances:
 *   get:
 *     summary: Retrieve a list of assistances
 *     tags: [Assistance]
 *     responses:
 *       200:
 *         description: A list of assistances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 */
router.get('/', getAssistances);

/**
 * @swagger
 * /api/assistances/today:
 *   get:
 *     summary: Retrieve today's assistance per student
 *     tags: [Assistance]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *       - in: query
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group
 *     responses:
 *       200:
 *         description: Today's assistance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 */
router.get('/today', getTodayAssistancePerStudent);

/**
 * @swagger
 * /api/assistances/{id}:
 *   put:
 *     summary: Update an existing assistance
 *     tags: [Assistance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The assistance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assistance'
 *     responses:
 *       200:
 *         description: Assistance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assistance not found
 */
router.put('/:id', updateAssistance);

/**
 * @swagger
 * /api/assistances/{id}/status:
 *   patch:
 *     summary: Update the status of an assistance
 *     tags: [Assistance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The assistance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the assistance
 *     responses:
 *       200:
 *         description: Assistance status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assistance not found
 */
router.patch('/:id/status', patchAssistanceStatus);

module.exports = router;

//678bff1d5af09b411accdc86
//678bfe43540c39d844b87b09