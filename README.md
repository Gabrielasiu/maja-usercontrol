# MAJA-usercontrol
Echa un vistazo a mi app desplegada: https://maja-usercontrol-2.onrender.com 

Maja User Control es una aplicación full-stack diseñada para la gestión de usuarios. Permite a los administradores agregar, actualizar y eliminar usuarios, mientras que los usuarios comunes pueden visualizar su información.

## Tecnologías utilizadas
Frontend:
React,
React Router, 
Bootstrap

Backend:
Node.js,
Express,
Sequelize (ORM),
PostgreSQL, 

Autenticación:
JWT (JSON Web Token)

## Características
Registro de usuarios: Los usuarios pueden registrarse proporcionando un nombre, correo electrónico y contraseña.

Inicio de sesión: Los usuarios pueden iniciar sesión con sus credenciales para acceder a la aplicación.

Panel de administración: Los administradores pueden ver, editar o eliminar usuarios del sistema.

Roles de usuario: El sistema distingue entre usuarios comunes y administradores.

Seguridad: Las contraseñas se almacenan de forma segura utilizando bcrypt, y la autenticación se maneja a través de JWT.

## Uso
Registro de Usuario: Los nuevos usuarios pueden registrarse completando el formulario de registro con su nombre, correo electrónico y contraseña.

Inicio de Sesión: Después de registrarse, los usuarios pueden iniciar sesión para acceder a sus datos y al panel de administración si tienen privilegios de administrador.

Panel de Administración: Los administradores pueden acceder a un panel donde pueden ver la lista de usuarios registrados, editar su información y eliminar usuarios.

## Intsalacion
Dirígete a la carpeta server:
bash
cd server

Instala las dependencias:
bash 

npm install

Configura las variables de entorno en un archivo .env:
bash

DB_NAME=nombre_de_tu_base_de_datos

DB_USER=tu_usuario_de_base_de_datos

DB_PASSWORD=tu_contraseña_de_base_de_datos

JWT_SECRET=tu_secreto_jwt

Ejecuta el servidor:
bash

npm start

Frontend (Aplicación React)
Dirígete a la carpeta front:
bash

cd front

Instala las dependencias:
bash

npm install

Ejecuta el servidor
npm start


