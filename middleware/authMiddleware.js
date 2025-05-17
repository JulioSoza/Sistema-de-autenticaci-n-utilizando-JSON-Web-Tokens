const jwt = require('jsonwebtoken');

// Autenticación JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded; // Contiene { id, iat, exp }
    next();
  });
}

// Autorización por rol (nuevo)
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acceso denegado: Se requiere rol ' + role });
    }
    next();
  };
}

module.exports = { authenticateToken, authorize };