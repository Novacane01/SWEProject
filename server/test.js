const Twitter = require('twitter')
const mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/test', (err, client) => {
    if (err) {
      console.error(err)
      return;
    }
    const db = client.db('test');
    console.log(`Now connected to database \'${db.databaseName}\'`);
    //...
  });
// const client = new Twitter({
//     consumer_key: 'grRAruJkJSz0pH8M8BVnAgS6J',
//     consumer_secret: '7K226QKFx0JHTh57qeyZRi5mZYjH7Pr3g2NWWSppunlmRGkx8F',
//     access_token_key: '1105507521530339329-c669l7ZSXCmywu1XtNX35kKTFsUa87',
//     access_token_secret: 'gyAkU1BusRKTW4BpqRHxkj6jJnVdZPlbaSdKoDjRmZ90z'
// });


// function authenticate_user(callback){
//     client.post('https://api.twitter.com/oauth/request_token', {oauth_callback:'https://stormy-plains-77511.herokuapp.com/'},  function(error,response, body) {
//         callback(`https://api.twitter.com/oauth/authenticate?${response.split('&')[0]}`);
//     });
// }
