const express = require('express');

const {
    createGroup,
    getGroups,
    updateGroup,
    addStudentToGroup,
    deleteGroup,
    updateGroupInfo,
    getAvailableGroups,
    getGroupInProgress,
    getGroupWithMembers,
    getTodayGroupActivities,
    getWeekGroupActivities
} = require('../controllers/groupClassController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protección de rutas
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieve a list of groups
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupClass'
 */
router.get('/', getGroups);

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupClass'
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 */
router.post('/', createGroup);

/**
 * @swagger
 * /api/groups/today:
 *   get:
 *     summary: Retrieve today's group activities
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of today's group activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 */
router.get('/today', getTodayGroupActivities);

/**
 * @swagger
 * /api/groups/week:
 *   get:
 *     summary: Retrieve this week's group activities
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of this week's group activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 */
router.get('/week', getWeekGroupActivities);


/**
 * @swagger
 * /api/groups/available:
 *   get:
 *     summary: Retrieve a list of groups when there are available spots
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of available groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 */
router.get('/available', getAvailableGroups);


/**
 * @swagger
 * /api/groups/in-progress:
 *   get:
 *     summary: Retrieve a list of groups that are in progress
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of groups in progress
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 */
router.get('/in-progress', getGroupInProgress);

/**
 * @swagger
 * /api/groups/{id}/members:
 *   get:
 *     summary: Retrieve a group with its members
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     responses:
 *       200:
 *         description: Group with members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.get('/:id/members', getGroupWithMembers);


/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     responses:
 *       204:
 *         description: Group deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.delete('/:id', deleteGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Update an existing group
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupClass'
 *     responses:
 *       200:
 *         description: Group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.put('/:id', updateGroup);

/**
 * @swagger
 * /api/groups/{id}/info:
 *   put:
 *     summary: Update group information
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupClass'
 *     responses:
 *       200:
 *         description: Group information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.put('/:id/info', updateGroupInfo);


/**
 * @swagger
 * /api/groups/{groupId}/students/{studentId}:
 *   post:
 *     summary: Add a student to a group
 *     tags: [Groups]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student added to the group successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GroupClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.post('/:groupId/students/:studentId', addStudentToGroup);


module.exports = router;