// 1. Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// 2. Configurar entorno
dotenv.config();

// 3. Crear la aplicación Express
const app = express();

// 4. Middleware para parsear JSON
app.use(express.json());

// 5. Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jwt-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de MongoDB:', err));

// 6. Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 7. Ruta base para probar que el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// 8. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
