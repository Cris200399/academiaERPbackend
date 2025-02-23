const User = require("../models/user");

exports.createUser = async (creatorId, userData) => {
    const creator = await User.findById(creatorId);
    if (!creator) throw new Error('Usuario creador no encontrado');

    let newRole;
    if (creator.role === 'superuser') {
        newRole = userData.role || 'admin'; // Un superuser o admin puede crear admin o user
    } else if (creator.role === 'admin') {
        newRole = userData.role || 'user'; // Un superuser o admin puede crear admin o user
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

exports.getUsers = async (user) => {
    return User.find({
        _id: {$ne: user.id},
        role: 'user'
    }, {password: 0});
}

exports.getUser = async (userId) => {
    return User.findById(userId, {password: 0});
}

exports.getAdmins = async (user) => {
    return User.find({
        _id: {$ne: user.id},
        role: 'admin'
    }, {password: 0});
}

exports.updateUser = async (userId, userData) => {
    delete userData.password;
    return User.findByIdAndUpdate(userId, userData, {new: true});
}

exports.patchPassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    // Verificar contraseña actual
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) throw new Error('Contraseña actual incorrecta');

    // Actualizar a nueva contraseña
    user.password = newPassword;
    await user.save();

    return {message: 'Contraseña actualizada con éxito'};
};

exports.deleteUser = async (userWhoWantDelete, userId) => {
    const user = await User.findById(userId);
    if (userWhoWantDelete.role === 'user') throw new Error('No tienes permisos para eliminar usuarios');
    if (!user) throw new Error('Usuario no encontrado');
    if (user.role === 'superuser') throw new Error('No puedes eliminar un superusuario');
    return User.findByIdAndDelete(userId);
}