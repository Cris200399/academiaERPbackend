const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Obtener el token desde los encabezados
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No autorizado'});
    }
    const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
    try {
        // Verificar el token con la clave secreta
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({message: 'Token inválido'});
    }
};

// Middleware para verificar roles
module.exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'No tienes permisos para esta acción'});
        }
        next();
    };
};
