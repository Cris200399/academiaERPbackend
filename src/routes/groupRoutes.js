const express = require('express');

const {
    createGroup,
    getGroups,
    updateGroup,
    addStudentToGroup,
    deleteGroup,
    updateGroupInfo,
    getAvailableGroups,
} = require('../controllers/groupController');

const router = express.Router();

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
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', getGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Delete a group
 *     tags: [Groups]
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
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 */
router.post('/', createGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     summary: Update an existing group
 *     tags: [Groups]
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
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.put('/:id', updateGroup);

/**
 * @swagger
 * /api/groups/{groupId}/students/{studentId}:
 *   post:
 *     summary: Add a student to a group
 *     tags: [Groups]
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
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.post('/:groupId/students/:studentId', addStudentToGroup);

/**
 * @swagger
 * /api/groups/{id}/info:
 *   put:
 *     summary: Update group information
 *     tags: [Groups]
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
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Group information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 */
router.put('/:id/info', updateGroupInfo);

/**
 * @swagger
 * /api/groups/available:
 *   get:
 *     summary: Retrieve a list of groups when there are available spots
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of available groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 */
router.get('/available', getAvailableGroups);

module.exports = router;