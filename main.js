const bodyParser = require("body-parser");
const express = require("express");
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const server = express();
require('dotenv').config();


server.use(bodyParser.json());
const port = 4567;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


server.post('/user', async (req, res) => {
    const name = req.body.name;
    try {
        await client.connect();
        const db = await client.db(process.env.DB_NAME);
        const id = (await db.collection("user").insertOne({name: name})).insertedId;
        res.send({"id": id.toString()});
    }   catch (e) {
        res.status(500).send(e);
    }
    finally {
        await client.close();
        res.end();
    }
});

server.get('/user/:id', async(req, res) => {
    const id = req.params.id;

    try {
        await client.connect();
        const db = await client.db("user");
        const user = await db.collection("user").findOne({_id: new ObjectId(id)});
        res.send(user);
    }   catch (e) {
        res.status(404).send(e);
    }
    finally {
        await client.close();
        res.end();
    }
});

server.listen(port, () => {
    console.log("USER: listening on port ", port);
});