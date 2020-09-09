const Cart = require('../models/cart');

exports.postCart = (req,res)=>{
    //insert in cart database;
    if(req.session.isLoggedIn){
    Cart.existingPrimaryKey(req.body.p_id , req.session.user_id).then(([result])=>{

       if(result[0]){
         Cart.updateCart(req.body.p_id , req.session.user_id , req.body.quantity).then(([cart])=>{
           return cart;
         }).then((re)=>{
           return res.redirect('/cart')
         }).catch(err=>err);
       }


       else{
         Cart.insertValues(req.body.p_id , req.session.user_id , req.body.quantity).then(([cart])=>{
           return cart;
         }).then((r)=>{
              return res.redirect('/cart')
         }).catch(err=>err);
       }
    }).catch(err=>err);
  }

  else{
    res.render('login',{
      title   : 'login',
      message : 'Login to proceed further'
    });
  }
}

exports.getCart = (req,res)=>{
  if(req.session.user_id){
    Cart.getCartProductsInfo(req.session.user_id).then(([products_list])=>{
      return res.render('cart',{
        title  : 'cart',
        products : products_list,
        isOrder :undefined,
        parameter: 'cart'
      });
    }).catch(err=>err);
  }
  else{
    res.render('login',{
      title   : 'login',
      message : 'Login to proceed further'
    });
  }
}

exports.deleteCart = (req,res)=>{
    const user_id = req.session.user_id;
    const p_id = req.body.productId;
    if(user_id){
      Cart.deletItemFromTheCart(user_id , p_id).then(([product])=>{
        res.redirect('/cart');
      }).catch(err=>err)
    }
    else{
      res.render('login',{
        title   : 'login',
        message : 'Login to proceed further'
      });
    }
}

exports.postdeleteAllItemsFromCart = (req,res)=>{
  const user_id = req.session.user_id;
    if(user_id){
      Cart.deleteAllItems(user_id).then(([result])=>{
        console.log("Delete all items From the Cart"+result);
        res.redirect('/');
      }).catch(err=>err);
    }

  else{
    res.render('login',{
      title   : 'login',
      message : 'Login to proceed further'
    });
  }
}
