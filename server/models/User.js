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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.INTEGER
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
  return bcrypt.compare(password, this.password);  // Compara la contraseña ingresada(password) con la almacenada(this.password)
};


//antes de que se cree el usuario, se utiliza bcrypt para hashear la contraseña
// // Método para cifrar la contraseña antes de guardarla en la base de datos
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);  // Cifra la contraseña antes de crear el usuario
});

module.exports = User;
