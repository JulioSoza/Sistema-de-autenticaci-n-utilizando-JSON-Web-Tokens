# Sistema de Autenticación con JWT en Node.js

Este proyecto implementa un sistema de autenticación usando JSON Web Tokens (JWT), con funcionalidades de registro, login y rutas protegidas.

## Tecnologías usadas
- Node.js
- Express
- MongoDB + Mongoose
- bcrypt para hash de contraseñas
- jsonwebtoken para tokens JWT

## Instalación
1. Clona el repositorio
2. Ejecuta `npm install` para instalar dependencias
3. Crea un archivo `.env` con estas variables:

4. Ejecuta el servidor con `npm start` o `nodemon app.js`

## Uso y pruebas con Postman

### Rutas principales:

- **POST /api/auth/login**  
  Permite iniciar sesión con email y password.  
  Devuelve un token JWT válido por 1 hora.

- **POST /api/auth/signup**  
  Registro de usuario.  
  **Esta ruta está protegida y requiere token JWT válido en header `Authorization: Bearer <token>`**.  
  Campos requeridos: name, email, password.

- **GET /api/auth/me**  
  Ruta protegida para obtener info del usuario logueado.  
  Debe enviarse token JWT en header `Authorization: Bearer <token>`.

### Ejemplo de uso en Postman:

1. **Login:** Enviar JSON con email y password para obtener token.  
2. **Signup:** Usar el token obtenido para crear usuarios nuevos.  
3. **Me:** Usar token para obtener info del usuario actual.

## Autor
Tu Nombre
