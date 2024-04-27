var express = require("express");
var http = require("http");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(cors());
// Import required modules
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');


//connect express to react to run react from localhost8080
app.use(express.static(path.join(__dirname, '../my-app/build')));


// Function to connect to an in-memory MongoDB server
async function connectToDb() {
  const mongoServer = await MongoMemoryServer.create(); // Use create to create an instance of an in-memory MongoDB server
  const uri = await mongoServer.getUri(); // Get the connection URI for the in-memory MongoDB server
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to the MongoDB server using MongoClient
  console.log("Connected to MongoDB in memory!");
  return client; // Return the MongoDB client instance
}

async function setupMongo() {
    const client = await connectToDb(); // Connect to the in-memory MongoDB server
    await createCollection(client); 
}

// Function to create a "products" collection in the database
async function createCollection(client) {
    const db = client.db("myDatabase");
    await db.createCollection("products"); 
    console.log("Created collection 'products'");
}

// set up our routes
app.get("/hello", function (req, res) {
// no need to set up HTTP headers
res.send("Hello World!");
}); // simply using res.send instead of res.write and res.end
app.get("/goodbye", function (req, res) {
res.send("Goodbye World!");
});
app.get("/", function (req, res) {
res.send("This is the root route!");
});


app.listen(8080, () => {
    console.log('listening on port 8080');
    setupMongo();
    const client = connectToDb(); 
});
