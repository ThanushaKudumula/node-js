const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");
        const database = client.db('myDatabase'); 
        const collection = database.collection('myCollection'); 
        const document = { name: "thanusha", type: "student" };
        const result = await collection.insertOne(document);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run();