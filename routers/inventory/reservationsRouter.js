const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");
const ReserveModels = require("./reservations-models");
var moment = require('moment');

// initalize db variables
const Reserve = Models.Reservations
const Connect = Models.ResInvConnect
const Inv = Models.Inventory

// make reservation (Checkout)
reservation.post("/", (req, res) => {
 
    const { items } = req.body; // items in user cart from FE

    const reservation = {
        renterFirstName: req.body.renterFirstName,
        renterLastname: req.body.renterLastName,
        renterEmail: req.body.renterEmail,
        rentStart: req.body.rentDate,
        returnDate: req.body.returnDate
    };
 
    // insert the new reservation to db
    Reserve.insert(reservation)
    .then(reservation => {
        console.log("RESERVATION", reservation)
        // for each item in array => add id and create connection
        items.forEach(item => {
            let connection = {
                reservationsId: reservation.id,
                inventoryId: item.id
            }
            console.log("connected object", connection)
            // begin connect
            Connect.insert(connection)
            .then(connected => {
                console.log("Reservation connected successfully", connected)
            })
            .catch(err => {
                console.log(`Error connecting reservation in /routers/inventory/reservationsRouter.js; Error occured on item with id of ${item.id}`, err)
            });
            // end connect
        });
        res.status(201).json({message: "Reservation successful!", reservation})
    })
    .catch(err => {
        console.log("ERROR", err)
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

// get all reservations by date range 😰 
// is there a better name for this endpoint?
// returns an array of item id's that are unavailable in that daterange
reservation.post("/availability/all", (req, res) => {
    // pass desired rent start and return
    const { rentDate, returnDate } = req.body;
    const daterange = {
        start: rentDate,
        end: returnDate
    }
    // have the endpoint return the date range 
    let conflictingReservations = []
    ReserveModels.findAllReserveItems()
    .then(reservations =>{
        let itemCache = {} // cache to prevent saving duplicate items 
        let inDateRange = [] // memory to house reservations in daterange
        
        const { start, end } = daterange;
        let conflictedItemIds = []
        reservations.forEach(reservation => {
            // checks each reservation in db to see if there is a reservation in the desired daterange that conflicts (also checks return status)
            let { rentStart, returnDate, returned } = reservation
            // This function is initialized at the bottom of this file
            let reserveConflict = checkConflicts(rentStart, returnDate, start, end)
            if( reserveConflict || returned === false ){
                console.log("at least one of these was true")
                // grab all items in reservation
                if(!(reservation.inventoryId in itemCache)){
                    itemCache[reservation.inventoryId] = reservation.itemName
                    conflictedItemIds.push(reservation.inventoryId)
                }  
            } 
        })
        console.log(conflictedItemIds)
        // PASSES BACK AN ARRAY OF CONFLICTED ITEM IDS
        res.status(200).json(conflictedItemIds)
    })
    .catch(err =>{
        console.log("ERROR GETTING RESERVATIONS", err)
        res.status(500).json({errorMessage: "Error getting reservations in daterange. This one's on us.", error: err})
    })
})

// get user's future reservations (done by email)

// get a user's past reservations (done by email)

// get reservations of one item by daterange

// get reservations of items in cart

// cancel reservation (patch or put)


// FUNCTIONS
function checkConflicts(rentStart, returnDate, startDateRange, endDateRange){
    console.log(`start date is between? ${moment(endDateRange).isBetween(rentStart, returnDate)} ...or the same? ${moment(rentStart).isSame(startDateRange)}`,  )

    if(moment(startDateRange).isBetween(rentStart, returnDate) || moment(rentStart).isSame(startDateRange) || moment(endDateRange).isBetween(rentStart, returnDate) || moment(returnDate).isSame(endDateRange) ){
        console.log("conflict worked")
        return true
    } else {
        return false
    }
}

function getConflicts(id){
    let conflicts = [];
    ReserveModels.findReservationItems(id)
    .then(items => {
        console.log("found items")
        // conflicts.push(items)
        // console.log(conflicts)
    })
    .catch(err => {
        return `error getting conflicts ${err}`
    })
    console.log(`conflicts in funct ${conflicts}`)
    return conflicts
}

module.exports = reservation