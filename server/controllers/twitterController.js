/* Fill out these functions using Mongoose queries*/
const Twitter = require('twitter')
const Location = require('../models/locationModel');
const client = new Twitter({
    consumer_key: 'grRAruJkJSz0pH8M8BVnAgS6J',
    consumer_secret: '7K226QKFx0JHTh57qeyZRi5mZYjH7Pr3g2NWWSppunlmRGkx8F',
    access_token_key: '1105507521530339329-c669l7ZSXCmywu1XtNX35kKTFsUa87',
    access_token_secret: 'gyAkU1BusRKTW4BpqRHxkj6jJnVdZPlbaSdKoDjRmZ90z'
});
    
//Connect to database
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function() {
//   console.log(`Connected to database \'${connection.db.databaseName}\'!`);
// });

findCountryByName = (name,placeType,callback)=>{
   Location.findOne({Name:name, PlaceType:placeType}).then((location)=>{
    callback(location['WOE_ID'].toString());
   }),(err)=>{
      if(err) throw err;
   }
};

exports.getTrendsAt = (req,res)=>{
  findCountryByName(req.query.name,req.query.placeType,(woe_id)=>{
    client.get('https://api.twitter.com/1.1/trends/place.json',{id:woe_id},(err,response,body)=>{
      console.log(JSON.parse(body.body)[0].trends);
      // console.log(body);
      return res.status(200).send(body);
    });
    // return res.status(404).send();
  });
}