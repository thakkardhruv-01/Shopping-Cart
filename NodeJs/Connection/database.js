const mongoose = require('mongoose');

function dbConnection() {
    mongoose.connect("mongodb://localhost:27017/Shopping-cart")
        .then(() => { console.log("database connection successful.") })
        .catch((err) => { console.log("DB Connection error: " + err); });
}

module.exports = dbConnection;