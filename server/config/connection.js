require('dotenv').config();

//importar sequelize
const Sequelize = require('sequelize');

//configuracion de conexión de sequelize con mi data base 
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
