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
                // update life span every second
                setTimeout(() => {
                    devCollection.findOne({
                        devId: "ug"  
                    })
                        .then(result => {
                            if(result.life <= 0) {
                                devCollection.findOneAndUpdate(
                                    { 
                                        devId: "ug" // update value with in database with name '' 
                                    },
                                    {
                                        $set: {
                                            life: result.life+1
                                        }
                                    },
                                    {
                                        upsert: true
                                    }
                                )

                                    .catch(error => console.error(error))
                            } 
                            res.render('index.ejs', {notif: result.life})
                            
                            //console.log(result.life-1)
                        })
                        .catch(error => console.error(error))
                }, 1000)
            })
            

            app.listen(process.env.PORT || 5000, function() {
                console.log('listening on 5000')
            });
        })
        .catch(error => console.error(error))


        /**
 * Close the given change stream after the given amount of time
 * @param {*} timeInMs The amount of time in ms to monitor listings
 * @param {*} changeStream The open change stream that should be closed
 */
function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
};

/**
 * Monitor listings in the listingsAndReviews collections for changes
 * This function uses the on() function from the EventEmitter class to monitor changes
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Number} timeInMs The amount of time in ms to monitor listings
 * @param {Object} pipeline An aggregation pipeline that determines which change events should be output to the console
 */
async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {
    const collection = client.db("deviceDB").collection("deviceCollection");

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#watch for the watch() docs
    const changeStream = collection.watch(pipeline);

    // ChangeStream inherits from the Node Built-in Class EventEmitter (https://nodejs.org/dist/latest-v12.x/docs/api/events.html#events_class_eventemitter).
    // We can use EventEmitter's on() to add a listener function that will be called whenever a change occurs in the change stream.
    // See https://nodejs.org/dist/latest-v12.x/docs/api/events.html#events_emitter_on_eventname_listener for the on() docs.
    changeStream.on('change', (next) => {
        console.log(next);
    });

    // Wait the given amount of time and then close the change stream
    await closeChangeStream(timeInMs, changeStream);
}