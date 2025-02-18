const express = require('express');

const privateClassController = require('../controllers/privateClassController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PrivateClasses
 *   description: API for managing private classes
 */

/**
 * @swagger
 * /api/private-classes:
 *   get:
 *     summary: Retrieve a list of private classes
 *     tags: [PrivateClasses]
 *     responses:
 *       200:
 *         description: A list of private classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateClass'
 */
router.get('/', privateClassController.getPrivateClasses);

/**
 * @swagger
 * /api/private-classes/students:
 *   get:
 *     summary: Retrieve a list of private classes with student details
 *     tags: [PrivateClasses]
 *     responses:
 *       200:
 *         description: A list of private classes with student details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateClass'
 *       400:
 *         description: Bad request
 */
router.get('/students', privateClassController.getPrivateClassesWithStudents);

/**
 * @swagger
 * /api/private-classes:
 *   post:
 *     summary: Create a new private class
 *     tags: [PrivateClasses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateClass'
 *     responses:
 *       201:
 *         description: The private class was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateClass'
 *       400:
 *         description: Bad request
 */
router.post('/', privateClassController.createPrivateClass);

/**
 * @swagger
 * /api/private-classes/{id}:
 *   patch:
 *     summary: Partially update a private class by ID
 *     tags: [PrivateClasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the private class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateClass'
 *     responses:
 *       200:
 *         description: Private class successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Private class not found
 */
router.patch('/:id', privateClassController.patchPrivateClass);


/**
 * @swagger
 * /api/private-classes/{privateClassId}/student/{studentId}:
 *   patch:
 *     summary: Add a student to a private class
 *     tags: [PrivateClasses]
 *     parameters:
 *       - in: path
 *         name: privateClassId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the private class
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to add
 *     responses:
 *       204:
 *         description: Student successfully added to private class
 *       400:
 *         description: Bad request or student already in class
 *       404:
 *         description: Private class not found
 */
router.patch('/:privateClassId/student/:studentId', privateClassController.addStudentToPrivateClass);

/**
 * @swagger
 * /api/private-classes/{id}:
 *   get:
 *     summary: Retrieve a single private class by ID
 *     tags: [PrivateClasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the private class
 *     responses:
 *       200:
 *         description: A single private class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateClass'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Private class not found
 */
router.get('/:id', privateClassController.getPrivateClassById);

/**
 * @swagger
 * /api/private-classes/{id}:
 *   delete:
 *     summary: Delete a private class by ID
 *     tags: [PrivateClasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the private class
 *     responses:
 *       200:
 *         description: Private class successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Private class not found
 */
router.delete('/:id', privateClassController.deletePrivateClass);


module.exports = router;