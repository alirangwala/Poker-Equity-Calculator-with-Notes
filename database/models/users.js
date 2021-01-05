const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;