const users = require("express").Router();
const Models = require("../helpers/models");
const check = require("../middleware/index");

// initialize variable for helpers to use the users table
const User = Models.Users;

const { validateUserId } = check

users.get("/username", (req, res) => {
    const username = req.body;
    User.findBy(username)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
users.put("/:id", validateUserId, (req, res) => {
    const { id } = req.params;
    const userUpdate = req.body;

    User.updateById(id, userUpdate)
    .then(user => {
        res.status(200).json({message: "User successfully updated!", user})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end updating the user"})
    });
});

users.delete("/:id", validateUserId, (req, res) => {
    const { id } = req.params;

    User.removeById(id)
    .then(user => {
        res.status(200).json({message: "User successfully deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

// add ability to save an item as a favorite
// will need to make a helper in model.js

module.exports = users;