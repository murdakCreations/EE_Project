const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://murdak:m0ng0DB4tl45@cluster0.eg7va.mongodb.net/?retryWrites=true&w=majority"
//const connectionString = process.env.MONGODB_URI
const path = require('path')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true },{limit: '4mb'}));
app.use(bodyParser.json({limit: '4mb'}))
app.use(express.static('public'))


MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to Database');
            const db = client.db('deviceDB');
            const devCollection = db.collection('deviceCollection');
            app.get('/', (req, res) =>{
                const cursor = devCollection.find().toArray()
                    .then(results => {
                        res.render('index.ejs')
                    })
                    .catch(error => console.error(error))
            })

            app.get('/login', (req, res) => {
                res.render('login.ejs')
            })

            app.get('/floor', (req, res) => {
                const cursor = devCollection.find().toArray()
                    .then(results => {
                        res.render('buildFloors.ejs', {floors: results})
                    })
                    .catch(error => console.error(error))
            })

            app.get('/room', (req, res) => {
                
                const cursor = devCollection.find().toArray()
                    .then(results => {
                        res.render('buildRooms.ejs', {rooms: results})
                    })
                    .catch(error => console.error(error))
            })

            app.get('/device', (req, res) => {
                const cursor = devCollection.find().toArray()
                    .then(results => {
                        res.render('addDevice.ejs', {deviceData: results})
                    })
                    .catch(error => console.error(error))
            })

            app.post('/buildIn', (req, res) =>{
                devCollection.findOne({
                    buildId: req.body.loginID   
                })
                    .then(result => {
                        if(result !== null) {
                            res.render('dashboard.ejs', {bName: result.buildName})
                        } else {
                            return res.json('ID not found')
                        }
                    })
                    .catch(error => console.error(error))
            })

            app.post('/img', (req, res) => {
                //console.log(req.body.pucha)
                //bodyJson = JSON.parse(req.body.pucha)
                devCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(error => console.error(error))
            })

            app.post('/device', (req, res) =>{
                // if image is uploaded, save image data and not just filename
                devCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/');
                    })
                    .catch(error => console.error(error))
            })

            app.post('/floor', (req, res) =>{
                // if image is uploaded, save image data and not just filename
                devCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/floor');
                    })
                    .catch(error => console.error(error))
                //console.log('post floor')
            })

            app.post('/room', (req, res) =>{
                // if image is uploaded, save image data and not just filename
                devCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/room', {floor: req.body.floorName});
                    })
                    .catch(error => console.error(error))
                //console.log('post floor')
            })

            app.put('/device', (req, res) => {
                devCollection.findOneAndUpdate(
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
                devCollection.deleteOne(
                    { devId: req.body.devId }
                )
                    .then(result => {
                        if (result.deletedCount === 0){
                            return res.json('No quote to delete')
                        }
                        res.json('Deleted Darth Vadar qute')
                    })
                    .catch(error => console.error(error))
            })

            app.listen(process.env.PORT || 5000, function() {
                console.log('listening on 5000')
            });
        })
        .catch(error => console.error(error))