


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

// client.get('https://api.twitter.com/1.1/search/tweets.json',{q:"#nasa", count:100},(err,body,reponse)=>{
//     // console.log(JSON.parse(body.body));
//     console.log(body.statuses.length);
//     // console.log(res);
//     // var data = JSON.parse(response.body);
//     // console.log(data.statuses);
//     // for(i = 0;i<data.statuses.length;i++){
//         // console.log(data.statuses[i].text);
//         // console.log("--------------------\n")
//     // }
// });

client.get('https://api.twitter.com/1.1/trends/place.json',{id:1,exclude:'hashtags'},(err,body,response)=>{
        var ret = body[0];
        console.log(body);

      });
