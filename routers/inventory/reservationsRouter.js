const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");

// initalize db variables
const Reserve = Models.Reservations
const Connect = Models.ResInvConnect
const Inv = Models.Inventory


// make item reservation
reservation.post("/", (req, res) => {
    // when an item is reserved change isAvailable to false
    const { itemId } = req.body
    const reservation = {
        renterFirstName: req.body.renterFirstName,
        renterLastname: req.body.renterLastName,
        renterEmail: req.body.renterEmail,
        rentStart: req.body.rentDate,
        returnDate: req.body.returnDate
    }
    // Needs to update the item to !isAvailable in item table <=== This isn't ideal and will be scrapped
    // need a better way to handle if an item is available or not 

    // Inv.findById(itemId).then(item =>{
    //     console.log("THE ITEM", item)
    //     // This flow won't be ideal... I need it to be unavailable only on the days it's reserved...
    //     item.isAvailable = false;
    //     Inv.updateById(itemId, item)
    //     .then(updated => {
    //         // res.status(200).json({message: "Item successfully updated!", updated})
    //         console.log("updated", updated)
    //     })
    //     .catch(err => {
    //         // res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    //         console.log(err)
    //     });
    // })
    // .catch(err => {
    //     res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    // });

    // insert the new reservation to db
    Reserve.insert(reservation)
    .then(reservation => {
        // tie together reservation and item using ids
        console.log("RESERVATION", reservation)
        const connection = {
            reservationsId: reservation.id,
            inventoryId: itemId
        };
        Connect.insert(connection)
        .then(connected => {
            console.log("Reservation connected successfully", connected)
        })
        .catch(err => {
            console.log("Error connecting reservation in /routers/inventory/reservationsRouter.js", err)
        });
        
        res.status(201).json({message: "Reservation successful!", reservation})
    })
    .catch(err => {
        console.log("ERROR", err)
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});


// cancel reservation (patch or put)

module.exports = reservation