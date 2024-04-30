import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  
  sku: String,
  name: String,
  type: String,
  price: Number,
  upc: String,
  category: [{
    id: String,
    name: String,
  }],
  shipping: Number,
  description: String,
  manufacturer: String,
  model: String,
  url: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
