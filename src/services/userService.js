const User = require("../models/user");

exports.createUser = async (creatorId, userData) => {
    const creator = await User.findById(creatorId);
    if (!creator) throw new Error('Usuario creador no encontrado');

    let newRole;
    if (creator.role === 'superuser') {
        newRole = 'admin';  // Solo un superusuario puede crear admins
    } else if (creator.role === 'admin') {
        newRole = 'user'; // Solo un admin puede crear users
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

exports.getUsers = async () => {
    return User.find({
        role: 'user'
    }, {password: 0});
}

exports.getUser = async (userId) => {
    return User.findById(userId, {password: 0});
}

exports.getAdmins = async () => {
    return User.find({
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

exports.deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    if (user.role === 'superuser') throw new Error('No puedes eliminar un superusuario');
    return User.findByIdAndDelete(userId);
}