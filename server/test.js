


// function authenticate_user(callback){
//     client.post('https://api.twitter.com/oauth/request_token', {oauth_callback:'https://stormy-plains-77511.herokuapp.com/'},  function(error,response, body) {
//         callback(`https://api.twitter.com/oauth/authenticate?${response.split('&')[0]}`);
//     });
// }
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key: 'grRAruJkJSz0pH8M8BVnAgS6J',
    consumer_secret: '7K226QKFx0JHTh57qeyZRi5mZYjH7Pr3g2NWWSppunlmRGkx8F',
    access_token_key: '1105507521530339329-c669l7ZSXCmywu1XtNX35kKTFsUa87',
    access_token_secret: 'gyAkU1BusRKTW4BpqRHxkj6jJnVdZPlbaSdKoDjRmZ90z'
});

client.get('https://api.twitter.com/1.1/search/tweets.json',{q:"#nasa",count:2},(err,res,body)=>{
    console.log( body.body);
});
