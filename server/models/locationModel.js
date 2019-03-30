/* Import mongoose and define any variables needed to create the schema */
const mongoose = require('mongoose'), 
    Schema = mongoose.Schema,
    config = require('../config/config');
    
mongoose.loc_conn = mongoose.createConnection(config.db.locationDB,{useMongoClient:true});

/* Create your schema */
var locationSchema = new Schema({
  WOE_ID: Number,
  // ISO: String,
  Name: String,
  //Language: String,
  PlaceType: String,
  Parent_ID: Number
});

/* Use your schema to instantiate a Mongoose model */
var Location = mongoose.loc_conn.model('Location', locationSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Location;