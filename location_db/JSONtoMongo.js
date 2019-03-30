'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Location = require('./LocationsSchema.js'), 
    config = require('./config'),
    csv = require('fast-csv');

/* Connect to your database */
mongoose.connect(config.db.uri);

var locations=[];
var counter=0;
var addedCounter=0;
var totalCounter=0;


csv
 .fromPath("geoplanet_places_7.10.0.csv", {headers: true})
 .on("data", function(data){
    if(counter==10000){
      Location.create(locations, function(err, documents){
        if(err) throw err;
      });
      counter=0;
      locations=[];
    } else{
      counter+=1;
    };
    if(data['PlaceType']=="County"){
      data['_id'] = new mongoose.Types.ObjectId();
     locations.push(data);
     addedCounter+=1;
    };
      totalCounter+=1;
     console.log("%d  %d", totalCounter, addedCounter);
 })
 .on("end", function(){
      Location.create(locations, function(err, documents){
        if(err) throw err;
      });
     console.log("done");
 });




