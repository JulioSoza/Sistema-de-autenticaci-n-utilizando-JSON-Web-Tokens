const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas
exports.protect = async (req, res, next) => {
  let token;

  // 1. Obtener el token del header 'Authorization'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Formato: "Bearer <token>"
  }

  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Token no proporcionado.' });
  }

  try {
    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Obtener el usuario del token y añadirlo al request
    req.user = await User.findById(decoded.id).select('-password');
    next();

  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};