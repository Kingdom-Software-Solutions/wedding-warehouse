
exports.up = function(knex) {
  return knex.schema.createTable('inventory', tbl => {
    tbl.increments('id').primary();
    tbl.string('itemName', 64).unique().notNullable();
    tbl.text('description', 500);
    tbl.integer('rentalRate', 100000)
    tbl.integer('buyNow', 500000)
    tbl.string('mainImgUrl', 255);
    tbl.string('thumbnailUrl', 255);
    tbl.boolean('isAvailable').defaultTo(true);
    tbl.integer('departmentId', 9)
    .unsigned()
    .references('id')
    .inTable('departments')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory')
};
