const { User } = require('../models');

const userData = [
  {
    user_name: 'Shirts',
    email: "gaby@gmail.com",
    password: "12345678",
    isAdmin: true
  },
  {
    user_name: 'Shorts',
    email: "gaby2@gmail.com",
    password: "12345678",
    isAdmin: false
  },
  {
    user_name: 'Music',
    email: "gaby3@gmail.com",
    password: "12345678",
    isAdmin: false
  },
  {
    user_name: 'Hats',
    email: "gaby4@gmail.com",
    password: "12345678",
    isAdmin: false
  },
  {
    user_name: 'Shoes',
    email: "gaby5@gmail.com",
    password: "12345678",
    isAdmin: false
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
