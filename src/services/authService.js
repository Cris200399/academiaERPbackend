const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (userData) => {
    const existingUser = await User.findOne({email: userData.email});
    if (existingUser) throw new Error('El usuario ya existe');

    const user = new User(userData);
    await user.save();
    return generateToken(user);
};

exports.login = async ({email, password}) => {
    const user = await User.findOne({email});
    if (!user) throw new Error('Usuario no encontrado');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Contraseña incorrecta');

    const token = generateToken(user);
    return {user, token};
};


const generateToken = (user) => {
    return jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
};

exports.getMe = async (userId) => {
    const user = await User.findById(userId).select('-password'); // No enviamos la contraseña
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

