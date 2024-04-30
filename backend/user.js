import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  faves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const User = mongoose.model('User', userSchema);

export default User;
