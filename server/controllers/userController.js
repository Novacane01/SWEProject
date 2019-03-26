const mongoose = require('mongoose');
const User = require('../models/userModel').User
const config = require('../config/config');
mongoose.Promise = global.Promise;
mongoose.connect(config.url,{useMongoClient: true});
const connection = mongoose.connection;

//Connect to database
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log(`Connected to database \'${connection.db.databaseName}\'!`);
});

//Controller Functions
exports.addUser = (req,res)=>{
  User.create(req.body).then((user)=>{
    console.log(`${req.body.username} added to database!`);
    res.status(201).send(user);
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

exports.deleteUser = (req,res)=>{
  User.deleteOne({username:req.params.username}).then((user)=>{
    res.status(204).send(`${req.params.username} has been removed from database`);
  },(err)=>{
    res.status(404).send(err);
  });
}