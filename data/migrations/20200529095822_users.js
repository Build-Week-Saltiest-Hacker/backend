
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
        table.increments()
        table.string('username', 64)
            .notNullable()
            .unique()
        table.string('password')
            .notNullable()
        table.string('email')
            .notNullable()
            .unique()
        table.string('name')
    })
    .createTable('saved_comments', table => {
        table.increments()
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.text('text')
        table.string('hn_username')
        table.float('score')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('saved_comments')
};
