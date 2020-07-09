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
    Models.Inventory.find()
    .then(items => {
        res.status(200).json(items)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
// get item by id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Models.Inventory.findById(id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
// update an item by id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Models.Inventory.updateById(id, changes)
    .then(updated => {
        res.status(200).json({message: "Item succsessfully updated!", updated})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})

// delete an item by id
router.delete("/:id", (req, res) => {
    Models.Inventory.removeById(id)
    .then(item => {
        res.status(200).json({message: "Item successfully deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})


module.exports = router;