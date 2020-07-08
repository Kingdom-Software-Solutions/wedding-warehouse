const router = require("express").Router();
const Models = require("../helpers/models");
const heimdal = require("../auth/authenticator")

// add a department
router.post("/", (req, res) => {
    let dept = req.body;

    Models.Department.insert(dept)
    .then(res =>{
        res.status(201).json({message:"Department successfully added!", dept})
    })
    .catch(err => {
        res.status(500).json({error: "err", errorMessage: "Oof, something went wrong on our end"})
    })
})

module.exports = router;