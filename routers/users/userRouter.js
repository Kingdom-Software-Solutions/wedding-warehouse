const router = require("express").Router();
const Models = require("../helpers/models");

router.get("/username", (req, res) => {
    const username = req.body;
    Models.Users.findBy(username)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Models.Users.updateById(id, changes)
    .then(user => {
        res.status(200).json({message: "User successfully updated!", user})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Models.Users.removeById(id)
    .then(user => {
        res.status(200).json({message: "User successfully deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

module.exports = router;