import express from "express";
import http from "http";
import path from 'path';
import cors from 'cors';
import connectDB from "./mongo.js";
import { fileURLToPath } from 'url';
import Product from "./product.js";
const app = express();
app.use(cors());

// Connect express to React to run React from localhost:8080
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.static(path.join(__dirname, '../my-app/build')));

//connect to the database using func from mongo.js
connectDB();

/*// Function to connect to an in-memory MongoDB server
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
}*/

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

// testing connection by finding all products
Product.find({})
  .then(products => {
    console.log(products);
  })
  .catch(error => {
    console.error(error);
  });


app.listen(8080, () => {
    console.log('listening on port 8080');
    //setupMongo();
    //const client = connectToDb(); 
});
