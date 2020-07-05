
exports.up = function(knex) {
    return knex.schema.createTable('users_rented', tbl => {
        tbl.increments('id').primary();
        tbl.date('rentDate').notNullable();
        tbl.boolean('returned').defaultTo(false);
        tbl.integer('timesRented');
        tbl.integer('userId', 9)
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl.integer('rentableId', 9)
        .unsigned()
        .references('id')
        .inTable('rentables')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_rented')
};
