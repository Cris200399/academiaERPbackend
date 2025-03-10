const express = require('express');
const multer = require('multer');

const StudentController = require('../controllers/studentController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no soportado'));
        }
    }
});

// Protección de rutas
router.use(authMiddleware);

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
router.get('/', StudentController.getStudents);

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
router.post('/', StudentController.createStudent);

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
router.get('/total', StudentController.getTotalStudents);

/**
 * @swagger
 * /api/students/total-overdue-students:
 *   get:
 *     summary: Get the total number of students with overdue payments
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Total number of students with overdue payments
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 10
 *       400:
 *         description: Bad request
 */
router.get('/total-overdue-students', StudentController.getTotalOverdueStudents);

/**
 * @swagger
 * /api/students/total-about-to-expire:
 *   get:
 *     summary: Get the total number of students with payments about to expire
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Total number of students with payments about to expire
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 5
 *       400:
 *         description: Bad request
 */
router.get('/total-about-to-expire', StudentController.getTotalStudentsAboutToExpire);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
router.get('/:id', StudentController.getStudent);

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
router.put('/:id', StudentController.updateStudent);

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
router.delete('/:id', StudentController.deleteStudent);

/**
 * @swagger
 * /api/students/{id}/status:
 *   patch:
 *     summary: Change the status of a student
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the student
 *     responses:
 *       200:
 *         description: Student status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */
router.patch('/:id/status', StudentController.changeStudentStatus);


/**
 * @swagger
 * /api/students/{studentId}/profile-image:
 *   put:
 *     summary: Update the profile image of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The profile image file
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put('/:studentId/profile-image', upload.single('image'), StudentController.updateProfileImage);

/**
 * @swagger
 * /api/students/{studentId}/profile-image:
 *   get:
 *     summary: Get the profile image of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Profile image retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/:studentId/profile-image', StudentController.getProfileImage);

/**
 * @swagger
 * /api/students/{studentId}/profile-image:
 *   delete:
 *     summary: Delete the profile image of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Profile image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:studentId/profile-image', StudentController.deleteProfileImage);


/**
 * @swagger
 * /api/students/{studentId}/document:
 *   put:
 *     summary: Update a document file of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The document file
 *     responses:
 *       200:
 *         description: Document file updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put('/:studentId/document', upload.single('document'), StudentController.updateDocumentFile);

/**
 * @swagger
 * /api/students/{studentId}/document:
 *   get:
 *     summary: Get a document file of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Document file retrieved successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/:studentId/document', StudentController.getDocumentFile);


module.exports = router;