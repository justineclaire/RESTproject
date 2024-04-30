import express from "express";
import http from "http";
import path from 'path';
import cors from 'cors';
import connectDB from "./mongo.js";
import { fileURLToPath } from 'url';
import Product from "./product.js";
import User from "./user.js";
const app = express();
app.use(cors());
app.use(express.json());

// Connect express to React to run React from localhost:8080
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
//app.use(express.static(path.join(__dirname, '../my-app/build')));

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

/*
// testing connection by finding all products
Product.find({})
  .then(products => {
    console.log(products);
  })
  .catch(error => {
    console.error(error);
  });
*/

app.put('/products', async (req, res) => {
  try {
      console.log('Received request:', req.body); // Check if request body is received
      const product = new Product(req.body.prod);
      await product.save();
      res.status(201).json({ message: 'Product created', product });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
try {
    const prod = new Product(req.body.prod);
    console.log(prod);
    // Find the product by ID
    const product = await Product.findById(prod._id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product with the new data
    product.set(prod);
    await product.save();
   
    res.status(201).json({ message: 'product updated!', product});
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.get('/products', async (req, res) => {
try {
    const prods = await Product.find();
    res.json(prods);
} catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
}
});

app.delete('/products/:id', async (req, res) => {
try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.post('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { productId } = req.body;
    try {
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Add the product ID to the faves array
      user.faves.push(productId);
      await user.save();
      res.json({ message: 'Product added to favorites' });
    } catch (err) {
      console.log('Error adding product to favorites:', err);
      res.status(500).json({error: err.message });
    }
  });

  app.get('/users/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.log('Error fetching user:', err);
      res.status(500).json({ error: err.message });
    }
  });

//search ingredients
app.get("/search/:search", async (req, res) => {
    const search = req.params.search;
    try {
        const regex = new RegExp(search, 'i'); // Create a case-insensitive regular expression
        const prod = await Product.find({ "name": { $regex: regex } });
        res.json(prod);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(8080, () => {
    console.log('listening on port 8080');
    //setupMongo();
    //const client = connectToDb(); 
});
