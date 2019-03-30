const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/config');
mongoose.Promise = global.Promise;
mongoose.user_conn =  mongoose.createConnection(config.db.userDB, {useMongoClient:true});

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

module.exports.User = mongoose.user_conn.model('User',userSchema);