const UserService = require("../services/userService");

exports.createUser = async (req, res) => {
    try {
        const newUser = await UserService.createUser(req.user.id, req.body);
        res.status(201).json({ message: 'Usuario creado con éxito', userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.params.userId, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.userId);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}