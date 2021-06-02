const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// connection configurations
const mySqlConnection = require('./app/model/db');

// connect to database
mySqlConnection.connect(err => {
    if (!err) {
        console.log("Successfully connected to the db.");
    } else {
        console.log("There was an error \n Error: " + JSON.stringify(err));
    }
});

app.listen(port, () => console.log("express server running on port 3000.."));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route