const Models = require('../helpers/models')




module.exports = {
    validateUserId,
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


