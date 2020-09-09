const Cart = require('../models/cart');
const Order = require('../models/order');

exports.postOrderFromCart = (req,res)=>{
  const user_id = req.session.user_id;
  if(user_id){
  Cart.getCartProductsInfo(req.session.user_id).then(([output])=>{
    console.log("postOrder",output);
    res.render('orders',{
        products : output,
        title : 'order'
    })
  }).catch(err=>err);
}
  else{
    res.render('login',{
      title   : 'login',
      message : 'Login to proceed further'
    });
  }

}

exports.postOrderFromOrder = (req,res)=>{
  const user_id = req.session.user_id;
  if(user_id){
  Order.getOrderProductsInfo(user_id).then(([output])=>{
    res.render('orders',{
        products : output,
        title : 'order'
    })
  }).catch(err=>err);
}
  else{
    res.render('login',{
      title   : 'login',
      message : 'Login to proceed further'
    });
  }

}



exports.postDeleteOrders = (req,res)=>{
  const user_id = req.session.user_id;
  console.log(req.body.isOrders);
  if(user_id && !req.body.isOrders){
    Order.insertOrders(user_id).then(([result])=>{
      return result;
    }).then((output)=>{
      Cart.deleteAllItems(user_id).then((out)=>{
        res.redirect('/');
      }).catch(error=>error)
    }).catch(err=>err);
  }
  else if(user_id){
      return res.redirect('/');
  }
  else{
      res.render('login',{
        title   : 'login',
        message : 'Login to proceed further'
      });
    }
}

exports.getOrders = (req,res)=>{
  const user_id = req.session.user_id;
  if(user_id){
    Order.fetchAll(user_id).then(([order])=>{
      return res.render('cart',{
        title  : 'Order',
        products : order,
        isOrder : 'true',
        parameter : 'order'
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
