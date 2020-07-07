
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id').primary();
        tbl.string('username', 64).unique().notNullable();
        tbl.string('password', 64).notNullable();
        tbl.string('email', 64).unique();
        tbl.boolean('isAdmin').defaultTo(0);
        tbl.string('addressLine1', 64);
        tbl.string('addressLine2', 64);
        tbl.string('addressCity', 64);
        tbl.string('addressCountry', 64);
        tbl.string('addressState', 64);
        tbl.string('addressZip', 64);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
