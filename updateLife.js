const { MongoClient } = require('mongodb');

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

        await findAllData(client)

    } finally {
        // Close the connection to the MongoDB cluster
        //await client.close();
    }
}

main().catch(console.error);

async function findAllData(client) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const collection = client.db("deviceDB").collection("deviceCollection")
    const result = await collection.find().toArray();

    if (result) {
        for(i=0; i<result.length; i++){
            if(result[i].life !== undefined && result[i].life > 0) {
                console.log(result[i].devId +" life: "+result[i].life)
                collection.updateMany({ devId: result[i].devId }, { $set: { life: result[i].life - 1 } })
            }
        }
        
    } else {
        console.log('No data found');
    }
}
