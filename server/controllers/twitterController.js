/* Fill out these functions using Mongoose queries*/
const Twitter = require('twitter')
const Location = require('../models/locationModel');
const client = new Twitter({
    consumer_key: 'grRAruJkJSz0pH8M8BVnAgS6J',
    consumer_secret: '7K226QKFx0JHTh57qeyZRi5mZYjH7Pr3g2NWWSppunlmRGkx8F',
    access_token_key: '1105507521530339329-c669l7ZSXCmywu1XtNX35kKTFsUa87',
    access_token_secret: 'gyAkU1BusRKTW4BpqRHxkj6jJnVdZPlbaSdKoDjRmZ90z'
});

findCountryByName = (name,placeType,callback)=>{
   Location.findOne({Name: new RegExp(`\\b${name}\\b`,'i'), PlaceType:placeType}).then((location)=>{
     console.log(location);
     if(location == null){
       return callback(new Error('Location not found'));
     }
    callback(null,location['WOE_ID'].toString());
   }),(err)=>{
      if(err) callback(err);
   }
};

exports.getTrendsAt = (req,res)=>{
  findCountryByName(req.query.name,req.query.placeType,(err,woe_id)=>{
    if(err) return res.status(404).send(err.message);
    client.get('https://api.twitter.com/1.1/trends/place.json',{id:woe_id,exclude:'hashtags'},(err,response,body)=>{
      var ret = JSON.parse(body.body)[0];
      if(ret){
        //console.log(ret.trends);
        console.log(ret.trends);
        return res.status(200).send(ret.trends);
      }
      return res.status(200).send(null);
    });
  });

  exports.getTrend = (req,res)=>{
    Twitter.call('https://api.twitter.com/1.1/search/tweets.json',{q:"nasa"});
  }
}

