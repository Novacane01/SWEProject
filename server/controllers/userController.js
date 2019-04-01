const User = require('../models/userModel').User
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Controller Functions
exports.addUser = (req,res)=>{
  // console.log('add');
  bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
    if(err) {
      console.log(err);
      return res.redirect('');
    }
    User.create({username:req.body.username,password:hash}).then((user)=>{
      console.log(user);
      res.redirect('/home');
    },(err)=>{
      console.log(err);
      res.redirect('/');
    });
  });
}

exports.getUser = (req,res)=>{
  User.findOne({username: req.params.username}).then((user)=>{
    if(user){
      console.log(user);
      res.status(200).send(user);
    }
    else{
      res.status(404).send(`User ${req.params.username} does not exit`);
    }
    
  },(err)=>{
    res.status(404).send(err);
  });
}

exports.authUser = (req,res)=>{
  User.findOne({username: req.body.username}).then((user)=>{
    console.log(user);
    if(user) {
      bcrypt.compare(req.body.password,user.password, (err, good)=> {
        if(err){
          console.log("shouldnt be here");
          console.log(err);
          return res.redirect('/');
        }
        if(good){
          return res.redirect('/home');
        }
      });
    }
    else{
      res.redirect('/');    
    }
  },(err)=>{
    console.log(err);
    res.redirect('/');
  });
}

exports.deleteUser = (req,res)=>{
  User.deleteOne({username:req.params.username}).then((user)=>{
    console.log(user);
    res.status(204).send();
  },(err)=>{
    res.status(404).send(err);
  });
}