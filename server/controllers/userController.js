const mongoose = require('mongoose');
const User = require('../models/userModel').User
const config = require('../config/config');
mongoose.connect(config.url,{useMongoClient: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log(`Connected to database \'${connection.db.databaseName}\'!`);
});

exports.addUser = (req,res)=>{
  User.create(req.body).then((user)=>{
    console.log(`${req.body.name} added to database!`);
    console.log(user);
    res.send(201).send();
  },(err)=>{
    throw err;
  });
}

exports.getUser = (req,res)=>{
  User.findOne({username: req.params.username}).then((user)=>{
    if(docs)
      res.status(200).send(docs);
    else
      res.status(404).send(`User ${req.params.username} does not exit`);
  },(err)=>{
    console.log(err);
    throw err;
  });
}

exports.deleteUser = (req,res)=>{
  User.deleteOne({username:req.params.username}).then((user)=>{
    console.log(user);
    res.status(204).send(`${req.params.username} has been removed from database`);
  },(err)=>{
    console.log(err);
    throw err;
  });
}