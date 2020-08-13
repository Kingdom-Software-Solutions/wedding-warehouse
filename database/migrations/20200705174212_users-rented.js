
exports.up = function(knex) {
  // This table was refactored and therefore doesn't completely match the migration name
    return knex.schema.createTable('reservations_inventory', tbl => {
        tbl.increments('id').primary();
        tbl.integer('reservationsId', 9)
        .unsigned()
        .references('id')
        .inTable('reservations')
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
  return knex.schema.dropTableIfExists('reservations_inventory')
};
