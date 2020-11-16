const Models = require('../helpers/models')

module.exports = {
    validateUserId, // depracated
    validateDeptId,
    validateDeptName,
    validateItemId
}

//custom middleware
function validateUserId(req, res, next) {
    const { id } = req.params;
    Models.Users.findById(id)
    .then(user => {
      if(user){
        req.user = user;
        next();
      } else {
        res.status(404).json({message: `User with the id of ${id} was not found`})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not get user'})
    });
}

function validateDeptId(req, res, next) {
  const { id } = req.params;
  Models.Department.findById(id)
  .then(dept => {
    if(dept){
      req.dept = dept;
      next();
    } else {
      res.status(404).json({message: `Department with the id of ${id} was not found`})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'Could not get Department'})
  });
}

function validateDeptName(req, res, next) {
  const deptObject = req.body;
  const {name} = deptObject
  Models.Department.findBy(deptObject)
  .then(dept => {
    if(dept.length > 0){
      req.dept = dept;
      next();
    } else {
      res.status(404).json({message: `Department with the name of ${name} was not found`})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'Could not get this Department'})
  });
}

function validateItemId(req, res, next) {
  const { id } = req.params;
  Models.Inventory.findById(id)
  .then(item => {
    if(item){
      req.item = item;
      next();
    } else {
      res.status(404).json({message: `Item with the id of ${id} was not found`})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'Could not get item'})
  });
};



