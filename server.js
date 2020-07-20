const express = require('express');
const path = require('path');
const app = express();


//commented out code will be brought in for database later

// const Pool = require('pg').Pool;
// require('dotenv').config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL
// })

const port = process.env.PORT || 3000;

app.use(express.json({limit:'1mb'}));

//CORS so that client be hosted seperately from the server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/submit', (request, response) => {
    console.log(request.body);
    console.log("submit post triggered");
    //request.body has the form info
});

app.listen(port, () => console.log(`Example app listening on port localhost:${port}`));