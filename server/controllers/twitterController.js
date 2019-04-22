const Twitter = require('twitter')
const locations = require('../controllers/locationController');
const client = new Twitter({
    consumer_key: 'grRAruJkJSz0pH8M8BVnAgS6J',
    consumer_secret: '7K226QKFx0JHTh57qeyZRi5mZYjH7Pr3g2NWWSppunlmRGkx8F',
    access_token_key: '1105507521530339329-c669l7ZSXCmywu1XtNX35kKTFsUa87',
    access_token_secret: 'gyAkU1BusRKTW4BpqRHxkj6jJnVdZPlbaSdKoDjRmZ90z'
});

findCountryByName = (name,placeType,callback)=>{
  for(i = 0;i<Object(locations).length;i++){
    if(locations[i].name.toLowerCase()==name.toLowerCase() && locations[i].placeType.name.toLowerCase() == placeType.toLowerCase()){
      return callback(null, locations[i].woeid);
    }
  }
  return callback(null,null);
};

exports.getTrendsAt = (req,res)=>{
  findCountryByName(req.query.name,req.query.placeType,(err,woe_id)=>{
    if(err) return res.status(404).send(err.message);
    if(woe_id){
      client.get('https://api.twitter.com/1.1/trends/place.json',{id:woe_id,exclude:'hashtags'},(err,body,response)=>{
        var ret = body[0];
        if(ret){
          return res.status(200).send(ret.trends);
        }
        return res.status(200).send(null);
      });
    }
    else{
      return res.status(200).send(null);
    }
  });
}

  exports.getTrend = (req,res)=>{
    client.get('https://api.twitter.com/1.1/search/tweets.json',{q:'#'+req.query.trend, count:100},(err,body,response)=>{
      var ret = body.statuses;
      if(ret!=undefined&&ret.length>0){
        return res.status(200).json(ret);
      }
      return res.status(200).send(null);
  });
}

