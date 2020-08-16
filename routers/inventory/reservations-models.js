const db = require('../../database/dbConfig');


// function to get all user's reservations by their email
// That way okta and guests can still look up what they've rented
function getReservations(email) {
    // find reservation by email (renterEmail)
}

function connect(connection){
    // insert into a third many-to-many table
    const [id] = db.insert('reservations_inventory').insert(connection, "id")
    return findById(id)
}
function findById(id) {
  return db('reservations_inventory')
    .select("id")
    .where({ id })
    .first();
};

module.exports ={
    connect
}