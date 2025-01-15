-- DROP DATABASE
DROP DATABASE IF EXISTS users;

-- CREATE DATABASE
CREATE DATABASE users;
CREATE TABLE users (
    user_name VARCHAR(255), -- Columna para el nombre de usuario
    email VARCHAR(255) UNIQUE, -- Columna para el email, debe ser único
    password VARCHAR(255), -- Columna para la contraseña
    is_admin BOOLEAN, -- Columna para indicar si el usuario es administrador
    created_by INTEGER -- Columna para almacenar el ID del creador (se asume que es otro usuario con ID)
);

