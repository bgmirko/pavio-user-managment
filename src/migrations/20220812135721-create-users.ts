const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'John',
      address: 'My street 1',
      email: 'john@gmail.com',
      password: await bcrypt.hash("mypassword", 12),
      likes: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Mirko',
      address: 'My street 2',
      email: 'mirko@gmail.com',
      password: await bcrypt.hash("mypassword", 12),
      likes: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Simona',
      address: 'My Street 3',
      email: 'simona@gmail.com',
      password: await bcrypt.hash("mypassword", 12),
      likes: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};