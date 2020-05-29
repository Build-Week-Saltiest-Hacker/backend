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
        .createTable('comments', table => {
            table.increments()
            table.text('text')
            table.string('hn_username')
            table.float('score')
            table.integer('user_id')
                .unsigned()
        })
    };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user_comments')
        .dropTableIfExists('comments')
        .dropTableIfExists('users')
  };
  