'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('./config'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js');

/* Connect to your database */
mongoose.connect(config.db.uri);
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
 fs.readFile('trends_global.json', 'utf8', function(err, data) {
    var listings=JSON.parse(data);
    listings.entries.forEach(function(building){
      var inBuilding=new Listing(building);
      inBuilding.save(function(err){});
    });
 });

/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
