const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const userRoute = require('./routes/userRoute');
const twitterRoute = require('./routes/twitterRoute');
const locationRoute = require('./routes/locationRoute');
const path = require ('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('Views'));
app.use(express.static('Scripts'));
app.use(express.static('Resources'));
app.use('/twitter',twitterRoute);
app.use('/locations',locationRoute);
app.use('/user',userRoute);
app.use('/register',(req,res)=>{
  res.sendFile(path.resolve('Views/registerpage.html'));
})
app.use('/home',(req,res)=>{
  res.sendFile(path.resolve('Views/homepage.html'));
});
app.use('/stats',(req,res)=>{
  res.sendFile(path.resolve('Views/statspage.html'));
});
app.use('/*',(req,res)=>{
  res.sendFile(path.resolve('Views/loginpage.html'));
})
app.listen(config.port,'localhost',()=>{
  console.log(`Now listening on port ${config.port}`);
});
