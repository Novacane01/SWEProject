/* Fill out these functions using Mongoose queries*/
const Location = require('../models/locationModel');
    
//Connect to database
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function() {
//   console.log(`Connected to database \'${connection.db.databaseName}\'!`);
// });

exports.findCountryByName = (req,res)=>{
   Location.findOne({Name:"India", PlaceType:"Country"}).then((location)=>{
     console.log(location['WOE_ID']);
      res.status(200).send(location['WOE_ID'].toString());
   }),(err)=>{
      if(err) throw err;
   }
};