const express = require('express'); // importa express de express
const routes = require('./routes/user-routes'); // importa las rutas de mi archivo rutas
const sequelize = require('./config/connection'); //import sequelize de mi archivo de configuracion
const cors = require('cors'); //importa el paquete cors 

const app = express(); // manda llamar la funcion express()
const PORT = process.env.PORT || 3001; // 

app.use(cors()); // use es un metodo de express que llama a cors
app.use(express.json()); // metodo para parsear json

app.use(routes); //express utiliza routes


// sincroniza sqeueliz con la base de datos 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});