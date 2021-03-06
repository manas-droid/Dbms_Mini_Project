
const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.getLogin = (req,res,next)=>{
  if(!req.session.isLoggedIn){
  res.render('login',{
    title : 'login',
    message : ''
  });
}
else{
  res.redirect('/');
}

}


exports.getSignup = (req,res,next)=>{
  if(!req.session.isLoggedIn){
    res.render('signup',{
      title : 'signup',
      message : ''
    });
  }
  else {
      res.redirect('/');
  }
}

exports.postLogin = (req,res,next)=>{
const name = req.body.name;
const email = req.body.email;
const address = req.body.address;
const state = req.body.state;
const city = req.body.city;
const zip = req.body.zip;
const phone = req.body.phone;
const password = req.body.password;
const confirmPassword = req.body.confirmPassword;

if(confirmPassword !== password){
    res.render('signup',{
      title : 'signup',
      message : 'passwords do not match'
    });
  }

  bcrypt.hash(password, 8).then(function(hash) {
    const user = new Users (name,email,address,state,city,zip,phone,hash);
    return user;
  }).then((user)=>{
    Users.searchEmail(email).then(([user_email])=>{
      console.log(user_email[0]);
      if(user_email[0]){
        return res.render('signup',{
          title : 'signup',
          message : 'This Email is already taken'
        });
      }
      user.save().then(()=>{
        res.redirect('/login');
      })
    });
  })

}


exports.getLogout = (req,res)=>{
  if(req.session.isLoggedIn){
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  }

  else {
    res.redirect('/');
  }
}
