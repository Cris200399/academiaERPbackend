const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const {user, token} = await authService.register(req.body);

        // Enviar el token en la respuesta
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {user, token} = await authService.login(req.body);

        // Enviar el token en la respuesta JSON
        res.json({
            user: user,
            token
        });
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
