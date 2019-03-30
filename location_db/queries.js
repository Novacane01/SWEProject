/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Location = require('./LocationsSchema.js'), 
    config = require('./config');
    //listings = require('./listings.json'),
    //data = listings.entries;
    
    mongoose.connect(config.db.uri);

var findByName = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   Location.find({"Name":"Utah"},(err,locations)=>{
    if(err) throw err;
    console.log(locations);
   });
};

// var retrieveAllListings = function() {
   
//     Retrieve all listings in the database, and log them to the console. 
   
//    Listing.find({},function(err, listing){
//     if(err) throw err;
//     console.log(listing);
//    });
// };

findByName();