const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    //checks whether origin is from allowedOrigins or no origin like postman for testing 
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 