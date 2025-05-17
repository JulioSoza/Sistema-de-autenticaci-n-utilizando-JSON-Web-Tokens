const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Público
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar email y contraseña
    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor ingresa email y contraseña.' });
    }

    // Buscar usuario
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Generar JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '1h',
    });

    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

// @desc    Obtener datos del usuario logueado
// @route   GET /api/auth/me
// @access  Privado (requiere token)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};