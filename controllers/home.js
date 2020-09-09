const Users = require('../models/users');
const Products = require('../models/products')
const bcrypt = require('bcrypt');

exports.getHomePage = (req,res)=>{
  if(req.session.isLoggedIn){
    console.log(req.session.user_id);
    Users.getCityById(req.session.user_id).then(([userCity])=>{
        return userCity[0].user_city;
    }).then((city)=>{
      let set = new Set();
      Products.getAvailableProducts(city).then(([products])=>{
        products.forEach((item) => {
          set.add(item.p_id);
        });
        return set;
      }).then((setOfIds)=>{
          Products.fetchAll().then(([products])=>{
            res.render('home',{
              title : 'home page',
              setOfIds,
              products
            });
          }).catch(err=>err);
      });
    })
    .catch(err=>err);
  }
  else {
    Products.fetchAll().then(([products])=>{

      console.log( products);
      res.render('home',{
        title : 'home page',
        setOfIds : undefined,
        products
      });
    }).catch(err=>err);
  }
}

exports.postHomePage = (req,res)=>{

  const {email,password} = req.body;
  Users.searchEmail(email).then(([user])=>{
    if(user.length === 0 )
    {
      res.render('login',{
        title : 'login',
        message : 'Please Enter Correct Email'
      })
    }

    bcrypt.compare(password , user[0].user_password).then(doMatch=>{
      if(doMatch){
        req.session.user_id = user[0].user_id;
        req.session.isLoggedIn = true;
        return res.redirect('/');
      }
      else {
        res.render('login',{
          title : 'login',
          message : 'Please Enter Correct Password'
        })
      }
    }).catch(err=>err);

  });
}
