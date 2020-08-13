const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");
// initalize db variables
const Reserve = Models.Reservations
const Inv = Models.Inventory


// make item reservation
reservation.post("/", (req, res) => {
    // when an item is reserved change isAvailable to false
    const item = req.body
    const { isAvailable } = req.body
    // need the id of the item
    // post a new Reservation
    // pass the userId if applicable to tie that reservation to the user?
        // okta handles the users so I just need a marker of some kind?
        // tied by email
    // Needs to update the item to !isAvailable in item table

    if(item) {
        Inv.updateById(item.id, isAvailable)
        .then(updated => {
            res.status(200).json({message: "Item successfully updated!", updated})
        })
        .catch(err => {
            res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
        })
        Reserve.insert(item)
        .then(reservation => {
            res.status(201).json({message: "Reservation successful!", reservation})
        })
        .catch(err => {
            res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
        })
    } else {
        res.status(400).json({error: "Missing itemId"})
    }
})


// cancel reservation (patch or put)