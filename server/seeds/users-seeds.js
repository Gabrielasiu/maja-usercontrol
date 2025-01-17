const User = require('../models/User');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
  const userData = [
    {
      user_name: 'Shirts',
      email: "gaby@gmail.com",
      password: "12345678",
      isAdmin: true,
      createdBy: null
    },
    {
      user_name: 'Shorts',
      email: "gaby2@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'Music',
      email: "gaby3@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'Hats',
      email: "gaby4@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'Shoes',
      email: "gaby5@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null
    },
  ];

  try {
    // Manually hash passwords
    const hashedUsers = await Promise.all(
      userData.map(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      })
    );

    // Perform bulkCreate
    await User.bulkCreate(hashedUsers);

    console.log('Users created successfully');
  } catch (err) {
    console.error('Error creating users:', err);
  }
}

module.exports = seedUsers;
