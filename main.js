const bodyParser = require("body-parser");
const express = require("express");
const server = express();
require('dotenv').config();


server.use(bodyParser.json());

server.post('/user', async (req, res) => {
    console.log(req.body);
    res.send("User posted");
});

server.get('/user/:id', async(req, res) => {
    console.log(req.params.id);

    const result = "User with id " + req.params.id + " found.";
    if (result) {
        res.send(result);
    } else {
        res.status(404);
    }

    res.end();
});

server.listen(4567);