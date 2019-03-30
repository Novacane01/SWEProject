/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

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
var Location = mongoose.model('Location', locationSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Location;
