
exports.up = function(knex) {
    return knex.schema.table('users', users => {
        users
            .json('saved')
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', users => {
      users.dropColumn('saved');
  });
};
