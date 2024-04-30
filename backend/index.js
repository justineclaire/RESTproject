import express from "express";
import mongoose from 'mongoose';
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
app.use(express.static(path.join(__dirname, '../my-app/build')));

//connect to the database using func from mongo.js
connectDB();

// set up our routes
app.get("/hello", function (req, res) {
  //endpoint for testing
  res.send("Hello World!");
});

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
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(201).json({ message: 'product deleted!', id});
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

app.post('/users', async (req, res) => {

    const productId = req.body.prod;
    const uid = req.body.user.uid;
    console.log(productId+req.body.user.name);
    try {
      let user = await User.findOne({ uid });
      if (!user) {
        user = new User(req.body.user);
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
      //Like a join in SQL get product info and user info
      const userWFaves = await User.aggregate([
        {
          $match: { uid: user.uid }
        },
        {
          $lookup: {
            from: 'products',
            localField: 'faves',
            foreignField: '_id',
            as: 'favouriteList'
          }
        }
      ]);
      // Send the modified userWithFavorites instead of the original user
      res.json(userWFaves);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/removeFaves', async (req, res) => {
    const { uid, prodid } = req.body;
    
    try {
      let user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log(user.faves);
      const objectIdProdId = new mongoose.Types.ObjectId(prodid);
      console.log(objectIdProdId);
      user.faves = user.faves.filter(fave => !fave.equals(objectIdProdId));
      await user.save();
      res.json({ message: 'Product removed from favorites' });
    } catch (error) {
      console.error('Error removing products:', error);
      res.status(500).json({ error: error.message });
    }
  });

//search products by name 
app.get("/search/:search", async (req, res) => {
    const search = req.params.search;
    try {
        const regex = new RegExp(search, 'i'); 
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
