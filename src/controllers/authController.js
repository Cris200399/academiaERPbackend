const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const token = await authService.register(req.body);
        res.status(201).json({token});
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

        res.json({user: {id: user._id, name: user.name, email: user.email}});
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
