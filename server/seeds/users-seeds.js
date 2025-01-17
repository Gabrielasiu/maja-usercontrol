const User = require('../models/User');
const bcrypt = require('bcrypt');

const seedUsers = async () => {
  const userData = [
    {
      user_name: 'Admin',
      email: "gaby@gmail.com",
      password: "12345678",
      isAdmin: true,
      createdBy: null
    },
    {
      user_name: 'angel',
      email: "gaby2@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'toñiyo',
      email: "gaby3@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'Grecia',
      email: "gaby4@gmail.com",
      password: "12345678",
      isAdmin: false,
      createdBy: null

    },
    {
      user_name: 'LEah',
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
