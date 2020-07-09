const router = require("express").Router();
const Models = require("../helpers/models");

// add an item to inventory
router.post("/", (req, res) => {
    let item = req.body;
    
    if(item.departmentId) {
        Models.Inventory.insert(item)
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
router.get("/", (req, res) => {
    Models.Department.find()
    .then(items => {
        res.status(200).json(items)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
// get item by id

// update an item by id

// delete an item by id


module.exports = router;