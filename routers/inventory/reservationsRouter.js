const reservation = require("express").Router();
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");
// initalize db variables
const Reserve = Models.Reservations
const Inv = Models.Inventory


// make item reservation
reservation.post("/", (req, res) => {
    // when an item is reserved change isAvailable to false
    const reservation = req.body
    const { itemId } = reservation
    console.log("ITEM ID", reservation.itemId)
    console.log("REQ.BODY", req.body)

    // need the id of the item
    // post a new Reservation
    // pass the userId if applicable to tie that reservation to the user?
        // okta handles the users so I just need a marker of some kind?
        // tied by email
    // Needs to update the item to !isAvailable in item table

    Inv.findById(itemId).then(item =>{
        console.log("THE ITEM", item)
        item.isAvailable = false;
        Inv.updateById(itemId, item)
        .then(updated => {
            // res.status(200).json({message: "Item successfully updated!", updated})
            console.log("updated", updated)
        })
        .catch(err => {
            // res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
            console.log(err)
        });
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });

    // insert the new reservation to db
    Reserve.insert(reservation)
    .then(reservation => {
        // add model to tie together reservation and item using
        const reserveId = reservation.id // will pass id to reserve model
        
        res.status(201).json({message: "Reservation successful!", reservation})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});


// cancel reservation (patch or put)

module.exports = reservation