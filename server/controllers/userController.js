const User = require('../models/userModel').User

//Connect to database
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function() {
//   console.log(`Connected to database \'${connection.db.databaseName}\'!`);
// });

//Controller Functions
exports.addUser = (req,res)=>{
  User.create(req.body).then((user)=>{
    console.log(user);
    res.redirect('/home');
  },(err)=>{
    res.redirect('back');
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
  User.findOne({username: req.params.username}).then((user)=>{
    console.log(user);
    res.redirect('/home');    
  },(err)=>{
    console.log(err);
    res.redirect('back');
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