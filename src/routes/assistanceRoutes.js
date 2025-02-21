const express = require('express');

const {
    createAssistance,
    getAssistances,
    updateAssistance,
    patchAssistanceStatus,
    getTodayAssistancePerStudent,
    deleteAssistance,
    getAssistancesPerStudentId
} = require('../controllers/assistanceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protección de rutas
router.use(authMiddleware);

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
 *     security:
 *      - bearerAuth: []
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
 *     summary: Get all assistances (Protected Route)
 *     tags: [Assistance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all assistances retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assistance'
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *     security:
 *      - bearerAuth: []
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
 *   delete:
 *     summary: Delete an assistance
 *     tags: [Assistance]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The assistance ID
 *     responses:
 *       204:
 *         description: Assistance deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Assistance not found
 */
router.delete('/:id', deleteAssistance);

/**
 * @swagger
 * /api/assistances/{id}:
 *   put:
 *     summary: Update an existing assistance
 *     tags: [Assistance]
 *     security:
 *      - bearerAuth: []
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
 *     security:
 *      - bearerAuth: []
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

/**
 * @swagger
 * /api/assistances/student/{studentId}:
 *   get:
 *     summary: Retrieve assistances for a specific student
 *     tags: [Assistance]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: A list of assistances for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assistance'
 *       400:
 *         description: Bad request
 */
router.get('/student/:studentId', getAssistancesPerStudentId);

module.exports = router;
