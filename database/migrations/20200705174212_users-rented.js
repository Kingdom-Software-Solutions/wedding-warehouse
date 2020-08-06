
exports.up = function(knex) {
    return knex.schema.createTable('users_rented', tbl => {
        tbl.increments('id').primary();
        tbl.date('rentDate').notNullable();
        // add a column for return date
        tbl.boolean('returned').defaultTo(false);
        tbl.integer('timesRented');
        tbl.integer('userId', 9)
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        tbl.integer('inventoryId', 9)
        .unsigned()
        .references('id')
        .inTable('inventory')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_rented')
};
