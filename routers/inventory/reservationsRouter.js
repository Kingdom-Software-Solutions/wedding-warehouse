const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");

// initalize db variables
const Reserve = Models.Reservations
const Connect = Models.ResInvConnect


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

// get reservations by date range 😰


// cancel reservation (patch or put)

module.exports = reservation