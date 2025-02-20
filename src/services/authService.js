const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('El usuario ya existe');

    const user = new User(userData);
    await user.save();
    return generateToken(user);
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales incorrectas');

    return generateToken(user);
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
