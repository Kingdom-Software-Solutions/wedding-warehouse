
exports.up = function(knex) {
    return knex.schema.createTable('reservations', tbl => {
        tbl.increments('id').primary();
        // change to datetime
        tbl.date('rentStart').notNullable();
        tbl.date('returnDate').notNullable();
        // add locale column as a string
        tbl.boolean('returned').defaultTo(false);
        tbl.string('renterFirstName', 255).notNullable();
        tbl.string('renterLastName', 255).notNullable();
        tbl.string('renterEmail', 255).notNullable();
        // need to add a confirmation number generator

        // status to handle cancelations 
        tbl.string('status', 255).defaultTo("active")
})
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reservations')
};
