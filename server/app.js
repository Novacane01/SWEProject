const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const userRoute = require('./routes/userRoute');
const path = require ('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
console.log(path.resolve('Views'));
app.use(express.static('Views'));
app.use(express.static('Scripts'));
app.use(express.static('Resources'));
app.use('/user',userRoute);
app.use('/*',(req,res)=>{
  res.sendFile(path.resolve('Views/loginpage.html'));
})
app.listen(config.port,'localhost',()=>{
  console.log(`Now listening on port ${config.port}`);
});