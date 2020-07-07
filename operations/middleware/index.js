const Models = require('../helpers/models')

module.exports = {
    validateUser,
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

// use this for post body validation
function validateUser(req, res, next) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: "missing user data" })
   } else {
    if (!req.body.username) {
     return res.status(400).json({ message: "missing required field: username" })
   } else if(!req.body.first_name){
    return res.status(400).json({ message: "missing required field: first_name"})
   } else if(!req.body.last_name) {
    return res.status(400).json({ message: "missing required field: last_name"})
   } else if(!req.body.zip_code) {
    return res.status(400).json({ message: "missing required field: zip_code"})
   }
   next();
   }
}

