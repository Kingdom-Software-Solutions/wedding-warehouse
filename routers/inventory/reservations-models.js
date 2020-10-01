const db = require('../../database/dbConfig');
// THIS IS UNUSED I THINK. REPURPOSE INTO SPECIAL MODEL TO HANDLE JOINS AND CASES TOO SPECIFIC FOR MODEL
function findAll(){
    return db('reservations').select("*");
}
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

function findAllReserveItems(){
    const reservation = db('reservations').select("reservations.rentStart", "reservations.returnDate", "inventory.id as inventoryId", "inventory.itemName")
    .join('reservations_inventory', 'reservations.id', 'reservations_inventory.reservationsId')
    .join('inventory', 'reservations_inventory.inventoryId', 'inventory.id')
    return reservation
}

function findReservationItems(id) {
    return db('reservations').select("*")
    .join('reservations_inventory', 'reservations.id', 'reservations_inventory.reservationsId')
    .join('inventory', 'reservations_inventory.inventoryId', 'inventory.id').where("reservations.id", id)
}

module.exports ={
    findAllReserveItems,
    connect,
    findReservationItems
    // findById
}