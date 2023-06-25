const mongoose = require('mongoose');
const connectionString = "mongodb://127.0.0.1/apagon"

mongoose.connect(connectionString)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
