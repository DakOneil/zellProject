
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://dakUser:ireLand6Nation$21@cluster0.cvpmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true}) 
  .then(client => {
    console.log('Connected to Database brahthaaa');
    const db = client.db('myFirstDatabase')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs' , {quotes: results})
        })
        .catch(error => console.error(error))
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
          ReadableStream.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Darth Vader'},
        {
          $set: {
            name: req.body.name, 
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
      .then(result => {
        if(result.deletedCount === 0) {
          return res.json('All quotes from Darth Vader have been vanquished.')
        }
        res.json(`Deleted Darth Vader's quote`)
      })
      .then(response => {
        if (response === 'All quotes from Darth Vader have been vanquished.') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(error => console.error(error))
    })
    app.listen(3000, function() {
      console.log("I'm listening on 3000")
    })
  })
  .catch(error => console.error(error))
