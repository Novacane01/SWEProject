const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  username:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength:18,
    required: true
  }
});

module.exports.User = mongoose.model('User',userSchema);