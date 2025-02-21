const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const {user, token} = await authService.register(req.body);

        // Configurar la cookie con el token
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000 // 1 hora
        });

        // Devolver datos del usuario sin información sensible
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


exports.login = async (req, res) => {
    try {
        const {user, token} = await authService.login(req.body);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.json({user: {id: user._id, name: user.name, rol: user.rol, email: user.email}});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('authToken', {httpOnly: true, sameSite: 'Strict', secure: process.env.NODE_ENV === 'production'});
    res.json({message: 'Sesión cerrada correctamente'});
}

exports.getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = await authService.createUser(req.user.id, req.body);
        res.status(201).json({ message: 'Usuario creado con éxito', userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


