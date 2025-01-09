const express = require('express');

const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getTotalStudents
} = require('../controllers/studentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', getStudents);

/**
 * @swagger
 * /api/students:
 *   post:
 *       summary: Create a new student
 *       tags:
 *         - Students
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the student
 *                 lastName:
 *                   type: string
 *                   description: Last name of the student
 *                 address:
 *                   type: string
 *                   description: Address of the student
 *                 gender:
 *                   type: string
 *                   description: Gender of the student
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                   description: Date of birth of the student
 *                 email:
 *                   type: string
 *                   description: Email of the student
 *                 phone:
 *                   type: string
 *                   description: Phone number of the student
 *                 group:
 *                   type: string
 *                   description: Reference to the group the student belongs to
 *                 dni:
 *                   type: string
 *                   description: National Identity Document of the student
 *                 guardianData:
 *                   type: object
 *                   description: Guardian data if the student is underage
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the guardian
 *                     phone:
 *                       type: string
 *                       description: Phone number of the guardian
 *                     relationship:
 *                       type: string
 *                       description: Relationship of the guardian to the student
 *       responses:
 *         '200':
 *           description: Student created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Student'
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */
router.post('/', createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
router.put('/:id', updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       204:
 *         description: Student deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
router.delete('/:id', deleteStudent);

/**
 * @swagger
 * /api/students/total:
 *   get:
 *     summary: Get the total number of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Total number of students
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 100
 *       400:
 *         description: Bad request
 */
router.get('/total', getTotalStudents);


module.exports = router;