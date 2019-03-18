/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  code: {type:String, required:true},
  name: {type:String, required:true},
  coordinates: {
    latitude : {type:Number, required:false},
    longitude : {type:Number, required:false}
  },
  address: {type:String, required:false},

  name: {type:String},
  url: {type:},
  promoted_content: {type:},
  query: {type:},
  tweet_volume: {type:},
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  var currentTime=new Date();
  this.updated_at=currentTime;
  if(this.created_at==undefined){
    this.created_at=currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
