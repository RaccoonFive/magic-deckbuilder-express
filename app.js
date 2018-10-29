const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')

const url = 'mongodb://localhost:27017';
const dbName = 'magic-deckbuilder';

var jsonParser = bodyParser.json()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors())

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const decks = db.collection('decks');

  app.get('/decks', function (req, res) {
    decks.find({}).toArray(function (err, docs) {
      res.send(docs)  
    })
  })


  app.post('/decks', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    let deck = { name: req.body.name }

    decks.save(deck, (err, result) => {
      if (err) return console.log(err)

      res.send(deck)
    })
  })


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
});