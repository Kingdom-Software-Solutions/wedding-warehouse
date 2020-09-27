const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");
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

// get all reservations by date range 😰 may need to be a post
// is there a better name for this endpoint?
reservation.post("/daterange/all", (req, res) => {
    // pass desired rent start and return
    const { rentDate, returnDate } = req.body;
    const daterange = {
        start: rentDate,
        end: returnDate
    }
    // get all reservations from table? that will be hefty, but I need something to parse. There will be a cart... If I get all of them, it may be slower but easier to refactor into the inventory page because that will need to check any and all reservations.
    // get all the reservations and save them in a cache by date?
    Reserve.find()
    .then(reservations =>{
        let inDateRange = [] // memory to house reservations in daterange
        const { start, end } = daterange;
        reservations.forEach(reservation => {
            // checks each reservation in db to see if there is a reservation in the desired daterange that conflicts (also checks return status)
            let { rentStart, returnDate } = reservation
            let checkStart = moment(rentStart).isBetween(start, end)
            let checkEnd = moment(returnDate).isBetween(start, end)
            console.log(`checkStart ${checkStart}, checkEnd: ${checkEnd}`)
            if( checkStart === true || checkEnd === true || returned === false ){
                console.log("at least one of these was true")
                inDateRange.push(reservation)
            }
        })
        res.status(200).json(inDateRange)
    })
    .catch(err =>{
        console.log("ERROR GETTING RESERVATIONS", err)
        res.status(500).json({errorMessage: "Error getting reservations in daterange. This one's on us.", error: err})
    })
        // save them in cache or list => prob list first
        // for each reservation, see if the reservation start or end date is inbetween the dates passed
        // if they are, add that reservation to a list to return
})

// get reservations of one item by daterange

// get reservations of items in cart

// cancel reservation (patch or put)

module.exports = reservation