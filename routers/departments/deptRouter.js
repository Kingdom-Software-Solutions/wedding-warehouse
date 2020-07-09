const router = require("express").Router();
// const Depts = require("../helpers/deptModel");
const Models = require("../helpers/models")
const heimdal = require("../auth/authenticator");

const Dept = Models.Department

// add a department
router.post("/", (req, res) => {
    let dept = req.body;

    Dept.insert(dept)
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
    Dept.find()
    .then(depts => {
        res.status(200).json(depts)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

// get dept by id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    Dept.findById(id)
    .then(dept => {
        res.status(200).json(dept);
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
})

// get dept by name
router.post("/name", (req, res) => {
    const name = req.body
    Dept.findBy(name)
    .then(([dept]) => {
        console.log(dept)
        res.status(200).json(dept)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })
});

// update dept

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Dept.updateById(id, changes)
    .then(updatedDept => {
        res.status(200).json(updatedDept)
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    })    
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Dept.removeById(id)
    .then(deleted => {
        res.status(200).json({message: "Department successfull deleted! 😬"})
    })
    .catch(err => {
        res.status(500).json({error: err, errorMessage: "Oof! Something went wrong on our end"})
    });
});

module.exports = router;