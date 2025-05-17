const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuarios (solo admin)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    
    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword, role });

    // Oculta el password en la respuesta
    user.password = undefined;
    res.status(201).json(user);

  } catch (err) {
    if (err.code === 11000) { // Error de duplicados en MongoDB
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todos los usuarios (solo admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};