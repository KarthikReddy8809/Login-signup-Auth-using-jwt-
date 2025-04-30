const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true   
  }
});

// No destructuring here — just assign it directly
const UserModel = mongoose.model('User', userSchema);

// Export the model
module.exports = UserModel;
