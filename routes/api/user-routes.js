const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../../models');

// The `/api/users` endpoint

router.get('/', async (req, res) => {
  // find all users
  // be sure to include its associated Products
  try {
    const userData = await User.findAll({
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one user by its `id` value
  // be sure to include its associated Products
  try {
    const userData = await User.findByPk(req.params.id, {

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

//create new user
router.post('/register', async (req, res) => {
  const { user_name, email, password, admin } = req.body;

  // Validación manual
  if (!user_name || !email || !password) {
    return res.status(400).json({ message: 'user_name, email, and password are required.' });
  }

  try {
    const newUser = await User.create({ user_name, email, password, admin });
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});
// router.post('/', async (req, res) => {
//   try {
//     const newUser = await User.create({
//       user_name: req.body.user_name,
//     });
//     res.status(200).json(newUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
