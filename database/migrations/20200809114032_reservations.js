
exports.up = function(knex) {
    return knex.schema.createTable('reservations', tbl => {
        tbl.increments('id').primary();
        tbl.date('rentStart').notNullable();
        tbl.date('returnDate').notNullable();
        tbl.boolean('returned').defaultTo(false);
        tbl.string('renterFirstName', 255).notNullable();
        tbl.string('renterLastName', 255).notNullable();
        tbl.string('renterEmail', 255).notNullable();
        // need some kind of way to track status before migrating this table to handle cancelations
        tbl.string('status', 255).defaultTo("active")
})
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reservations')
};
