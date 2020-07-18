var jwt = require('express-jwt');
var jwks = require('jwks-rsa');




var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://kss-wedding-warehouse.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://kss-wedding-warehouse.us.auth0.com/api/v2/',
  issuer: 'https://kss-wedding-warehouse.us.auth0.com/',
  algorithms: ['RS256']
});

module.exports = jwtCheck
