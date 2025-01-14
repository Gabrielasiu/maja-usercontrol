const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;




//AUTH con token no se si necesite esto 
// const express = require('express');
// const app = express();

// // Middleware de autenticación
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token || token !== 'mi-token-secreto') {
//     return res.status(401).send('No autorizado');
//   }
//   next(); // Si está autorizado, continúa
// };

// // Aplica el middleware solo a esta ruta
// app.get('/admin', authMiddleware, (req, res) => {
//   res.send('Bienvenido al panel de administración');
// });

// app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
