/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Location = require('./LocationsSchema.js'), 
    config = require('./config');
    
mongoose.connect(config.db.uri);

var findCountryByName = function() {
   Location.findOne({"Name":"India", "PlaceType":"Country"},(err,location)=>{
    if(err) throw err;
    console.log(location['WOE_ID']);
   });
};