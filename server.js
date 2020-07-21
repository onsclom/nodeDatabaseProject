const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const connectionString = process.env.DB_STRING;

const { Pool, Client } = require('pg')
const pool = new Pool({
    connectionString: connectionString,
})

const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

//CORS so that client be hosted seperately from the server
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/submit', (request, response) => {

    const userInfo = request.body;

    let queryString = "INSERT INTO Entries VALUES (";
    queryString += "'" + userInfo.lastname + "',";
    queryString += "'" + userInfo.firstname + "',";
    queryString += "'" + userInfo.username + "');";

    pool.query(queryString, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log("added.");

            const validationMessage = {
                status: "success"
            };

            response.json(JSON.stringify(validationMessage));
        }
    });

});

app.get('/entries', (request, response) => {

    pool.query('SELECT LastName, FirstName, Username FROM Entries;', (err, res) => {
        if (err) {
            console.log(err.stack);

            const validationMessage = {
                status: "failure"
            };

            response.json(JSON.stringify(validationMessage));

        } else {
            const validationMessage = {
                status: "success",
                rows: res.rows
            };

            response.json(JSON.stringify(validationMessage));
        }
    });

});

app.listen(port, () => console.log(`App listening on port localhost:${port}`));