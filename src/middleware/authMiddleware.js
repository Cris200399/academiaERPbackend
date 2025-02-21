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
