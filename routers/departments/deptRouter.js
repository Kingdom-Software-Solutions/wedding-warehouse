const router = require("express").Router();
// const Depts = require("../helpers/deptModel");
const Models = require("../helpers/models")
const heimdal = require("../auth/authenticator");

// add a department
router.post("/", (req, res) => {
    let dept = req.body;

    Models.Department.insert(dept)
    .then(dept =>{
        res.status(201).json({message:"Department successfully added!", dept})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err, errorMessage: "Oof, something went wrong on our end"})
    });
})

// find all depts
router.get("/", (req, res) => {
    Models.Department.find()
    .then(depts => {
        res.status(200).json(depts)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

module.exports = router;