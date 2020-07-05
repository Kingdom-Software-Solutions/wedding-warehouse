
exports.up = function(knex) {
  return knex.schema.createTable('departments', tbl =>{
      tbl.increments('id').primary();
      tbl.string('name', 64).unique().notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('departments');
};
