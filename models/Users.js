// const { DataTypes } = require('sequelize');
// const sequelize = require('./db'); // archivo donde está tu conexión Sequelize

// const User = sequelize.define('User', {
//   // Definición de los atributos de la tabla
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,  // No puede ser null
//     unique: true,      // Debe ser único
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true,  // Validar que el correo sea correcto
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
// //   role: {
// //     //ME FALTA PONER ESTO, NO SE SI PONER ISADMIN? y boolean
// //   }
// });

// module.exports = User;
