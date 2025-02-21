const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (userData) => {
    const existingUser = await User.findOne({email: userData.email});
    if (existingUser) throw new Error('El usuario ya existe');

    const user = new User(userData);
    await user.save();

    const token = generateToken(user);

    return {user, token};
};

exports.login = async ({email, password}) => {
    const user = await User.findOne({email});
    if (!user) throw new Error('Usuario no encontrado');

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) throw new Error('Contraseña incorrecta');

    const token = generateToken(user);

    return {user, token};
};

exports.createUser = async (creatorId, userData) => {
    const creator = await User.findById(creatorId);
    if (!creator) throw new Error('Usuario creador no encontrado');

    let newRole;
    if (creator.role === 'superuser') {
        newRole = 'admin';  // Solo un superusuario puede crear admins
    } else if (creator.role === 'admin') {
        newRole = 'subuser'; // Solo un admin puede crear subusuarios
    } else {
        throw new Error('No tienes permisos para crear usuarios');
    }

    const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: newRole,
        createdBy: creatorId
    });

    await user.save();
    return user;
};


exports.getMe = async (userId) => {
    const user = await User.findById(userId).select('-password'); // No enviamos la contraseña
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'});
};

