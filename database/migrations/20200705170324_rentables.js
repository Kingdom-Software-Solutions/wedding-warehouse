
exports.up = function(knex) {
  return knex.schema.createTable('rentables', tbl => {
    tbl.increments('id').primary();
    tbl.string('itemName', 64).unique().notNullable();
    tbl.text('description', 500);
    tbl.string('designUrl', 255);
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
  return knex.schema.dropTableIfExists('rentables')
};
