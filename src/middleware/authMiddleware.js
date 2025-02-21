const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.authToken; // Obtener el token desde las cookies
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Guardamos los datos del usuario en la request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Middleware para verificar roles
module.exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No tienes permisos para esta acción' });
        }
        next();
    };
};
