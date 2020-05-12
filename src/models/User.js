const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 6,
  },
});

var userModel = new mongoose.model('User', UserSchema);

module.exports = userModel;