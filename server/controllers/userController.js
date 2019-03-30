const mongoose = require('mongoose');
const User = require('../models/userModel').User
const config = require('../config/config');
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, {useMongoClient:true});
const connection = mongoose.connection;
const path = require('path');

//Connect to database
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log(`Connected to database \'${connection.db.databaseName}\'!`);
});

//Controller Functions
exports.addUser = (req,res)=>{
  User.create(req.body).then((user)=>{
    console.log(`${req.body.username} added to database!`);
    res.sendFile(path.resolve('Views/homepage.html'));
  },(err)=>{
    res.status(404).send(err);
  });
}

exports.getUser = (req,res)=>{
  User.findOne({username: req.params.username}).then((user)=>{
    if(user)
      res.status(200).send(user);
    else
      res.status(404).send(`User ${req.params.username} does not exit`);
    
  },(err)=>{
    res.status(404).send(err);
  });
}

exports.authUser = (req,res)=>{
  User.findOne({username: req.params.username}).then((user)=>{
    if(user)
      res.redirect(200,'https://google.com');
    else
      res.redirect(200,'back');
    
  },(err)=>{
    res.status(404).send(err);
  });
}

exports.deleteUser = (req,res)=>{
  User.deleteOne({username:req.params.username}).then((user)=>{
    console.log(`${req.params.username} removed from database!`);
    res.status(204).send();
  },(err)=>{
    res.status(404).send(err);
  });
}