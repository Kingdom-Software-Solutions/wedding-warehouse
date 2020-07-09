const router = require("express").Router();
const Models = require("../helpers/models");
const check = require("../middleware/index");

const User = Models.Users;

const { validateUserId } = check

router.get("/username", (req, res) => {
    const username = req.body;
    User.findBy(username)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
router.put("/:id", validateUserId, (req, res) => {
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

router.delete("/:id", validateUserId, (req, res) => {
    const { id } = req.params;

    User.removeById(id)
    .then(user => {
        res.status(200).json({message: "User successfully deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

module.exports = router;