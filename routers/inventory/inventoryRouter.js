const inventory = require("express").Router();
const middleware = require("../middleware/index");
const heimdal = require("../middleware/oktaAuth")
const Models = require("../helpers/models");
// initalize db variables
const Inv = Models.Inventory
// const Review = Models.Reviews

const { validateItemId } = middleware

// add an item to inventory
// when okta can login we can test/use this middleware
inventory.post("/", (req, res) => {
    let item = req.body;
   
    if(item.departmentId) {
        Inv.insert(item)
        .then(newItem => {
            res.status(201).json({message: "Item successfully added to DB!", newItem})
        })
        .catch(err => {
            res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
        })
    } else {
        res.status(400).json({error: "Missing departmentId"})
    }
})
// get all inventory
inventory.get("/", (req, res) => {
    Inv.find()
    .then(items => {
        res.status(200).json(items)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
// get item by id
inventory.get("/:id", validateItemId, (req, res) => {
    const { id } = req.params;
    // join item to reviews table later and grab reviews with the item?
    Inv.findById(id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
// update an item by id
inventory.put("/:id", validateItemId, (req, res) => {
    const { id } = req.params;
    const itemUpdate = req.body;
    Inv.updateById(id, itemUpdate)
    .then(updated => {
        res.status(200).json({message: "Item succsessfully updated!", updated})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})

// delete an item by id
inventory.delete("/:id", validateItemId, (req, res) => {
    const { id } = req.params;
    Inv.removeById(id)
    .then(item => {
        res.status(200).json({message: "Item successfully deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
});

// Add POST, PUT, DELETE a review on an item


module.exports = inventory;