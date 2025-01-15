const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    //TMB PUEDE SER ASI EN VEZ DE IS ADMIN
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: 'user', // Rol por defecto
    // },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
    
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
// Método para verificar si la contraseña es correcta
User.prototype.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);  // Compara la contraseña ingresada con la almacenada
};

// // Método para cifrar la contraseña antes de guardarla en la base de datos
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);  // Cifra la contraseña antes de crear el usuario
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);  // Cifra la nueva contraseña antes de actualizar el usuario
  }
});

module.exports = User;
