const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         role:
 *           type: string
 *           description: The user's role
 *           default: Usuario
 *         email:
 *           type: string
 *           description: The user's email
 *           unique: true
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         name: John Doe
 *         role: Admin
 *         email: johndoe@example.com
 *         password: password123
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['superuser', 'admin', 'subuser'],
        required: true,
        default: 'subuser'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    } // Este campo indica quién creó la cuenta (para admins y subusers)
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
