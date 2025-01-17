const router = require('express').Router(); // importa la funcion router de express, la ejectuta y la guarda en la variable rputer y lueho la usa 
const User = require('../models/User');//importa el model user
const { signToken } = require('../utils/jwtauth'); //importa jwta 

// ruta para hacer SIGN IN
//con la funcion router se realiza un post a la url, '', toma del body (enviado en la peticion las propiedades email y password.
//si no hay usuario o la contraseña ingresada es incorrecta, responde con un mensaje
// primer parametro es el endpoint y el segundo es lo que hace cuando se realiza un post en la ruta 
router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  // de mi base de datos busca la tabla user y en ella busca el email 
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.isCorrectPassword(password))) {
    console.log("incorrect password");
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Generar token
  const token = signToken(user);
  res.json({ token });
});

// ruta para obtener los usuarios de la base de datos 
router.get('/api/users', async (req, res) => {
  // find all users
  //en la variable userData se guardaran los usuarios que se encuentren en la tabla user, lo convertira en json y lo eviara como res al client
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/api/users/:id', async (req, res) => {
  // find all users
  try {
    const userData = await User.findAll({
      where: {
        createdBy: req.params.id
      }
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/users/', async (req, res) => {
  const { user_name, email, password, createdBy } = req.body;

  // Validación manual
  if (!user_name || !email || !password || !createdBy) {
    return res.status(400).json({ message: 'user_name, email, createdBy, and password are required.' });
  }

  try {
    const newUser = await User.create({ user_name, email, password, createdBy });
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

//create new user LE QUITE EL IS ADMIN
router.post('/api/users/register', async (req, res) => {
  const { user_name, email, password } = req.body;

  // Validación manual
  if (!user_name || !email || !password) {
    return res.status(400).json({ message: 'user_name, email, and password are required.' });
  }

  try {
    const newUser = await User.create({ user_name, email, password });
    // Generar token
    const token = signToken(newUser);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/api/users/:id', async (req, res) => {
  // update a user by its `id` 
  try {
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body)
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log("err", err)
  }
});

router.delete('/api/users/:id', async (req, res) => {
  // delete a user by its `id` value
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
