require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 4000;

server.listen( 
    PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    }
)