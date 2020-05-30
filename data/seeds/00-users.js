const bcrypt = require('bcryptjs');

const password = 'lkajsdo9232398'

hash = bcrypt.hashSync(password, 10)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'JLC6290', password: 'password', name: 'James', email: 'James@clark.com'},
      ]);
    });
};
