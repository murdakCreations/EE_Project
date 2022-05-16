const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://murdak:m0ng0DB4tl45@cluster0.eg7va.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.set('view engine', 'ejs')

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('deviceDB');
    const quoteCollection = db.collection('deviceCollection');
    app.get('/', (req, res) =>{
        const cursor = quoteCollection.find().toArray()
            .then(results => {
                res.render('index.ejs', {device: results})
            })
            .catch(error => console.error(error))
    });
    
    app.post('/device', (req, res) =>{
        // if image is uploaded, save image data and not just filename
        quoteCollection.insertOne(req.body)
            .then(result => {
                //res.redirect('/');
            })
            .catch(error => console.error(error))
    });

    /*app.put('/device', (req, res) => {
        quoteCollection.findOneAndUpdate(
            { 
                name: '' // update value with in database with name '' 
            },
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

    app.delete('/device',(req,res) => {
        // Handle delete event here
        quoteCollection.deleteOne(
            { name: req.body.name }
        )
            .then(result => {
                if (result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json('Deleted Darth Vadar qute')
            })
            .catch(error => console.error(error))
    })
*/
    app.listen(3001, function() {
        console.log('listening on 3001')
    });
  })
  .catch(error => console.error(error))