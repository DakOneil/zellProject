
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.listen(3000, function() {
    console.log("I'm listening on 3000")
})
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})

MongoClient.connect('mongodb+srv://dakUser:ireLand6Nation$21@cluster0.cvpmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true
  }, (err, client) => {
    // ... do something here
    if (err) return console.error(err)
  console.log('Connected to Database')
  .then(client => {
      const db = client.db('myFirstDatabase')
      const quotesCollection = db.collection('quotes')
  })
})
