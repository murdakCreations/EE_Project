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

var changedVal

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://murdak:m0ng0DB4tl45@cluster0.eg7va.mongodb.net/?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        
        // Make the appropriate DB calls
        app.get('/', (req, res) =>{
            res.render('index.ejs', { notif: changedVal })
        })
        /**
         * An aggregation pipeline that matches on new listings in the country of Australia and the Sydney market
         */
        const pipeline = [];

        
        // This script contains three ways to monitor new listings in the listingsAndReviews collection.
        // Comment in the monitoring function you'd like to use.

        // OPTION ONE: Monitor new listings using EventEmitter's on() function.
         await monitorListingsUsingEventEmitter(client, 30000, pipeline);

        // OPTION TWO: Monitor new listings using ChangeStream's hasNext() function
        // await monitorListingsUsingHasNext(client, 30000, pipeline);

        // OPTION THREE: Monitor new listings using the Stream API
        // await monitorListingsUsingStreamAPI(client, 30000, pipeline);

        app.listen(process.env.PORT || 5000, function() {
            console.log('listening on 5000')
        });
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

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
    const collection = client.db("sample_airbnb").collection("listingsAndReviews");

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#watch for the watch() docs
    const changeStream = collection.watch(pipeline);

    // ChangeStream inherits from the Node Built-in Class EventEmitter (https://nodejs.org/dist/latest-v12.x/docs/api/events.html#events_class_eventemitter).
    // We can use EventEmitter's on() to add a listener function that will be called whenever a change occurs in the change stream.
    // See https://nodejs.org/dist/latest-v12.x/docs/api/events.html#events_emitter_on_eventname_listener for the on() docs.
    changeStream.on('change', (next) => {
        
        console.log(next);
        collection.findOne({
            _id: next.documentKey._id
        })
            .then(result => {
                if(result !== null) {
                    changedVal = result
                    console.log(result)
                } else {
                    console.log('ID not found')
                }
            })
            .catch(error => console.error(error))
        
    });

    // Wait the given amount of time and then close the change stream
    await closeChangeStream(timeInMs, changeStream);
}