const Cart = require('../models/cart');

exports.postCart = (req,res)=>{
    console.log(req.body);
    //insert in cart database;
    Cart.existingPrimaryKey(req.body.p_id , req.session.user_id).then(([result])=>{

       if(result[0]){
         Cart.updateCart(req.body.p_id , req.session.user_id , req.body.quantity).then(([cart])=>{
           console.log('updation');
           return cart;
         }).then((re)=>{
           return res.redirect('/cart')
         }).catch(err=>err);
       }


       else{
         Cart.insertValues(req.body.p_id , req.session.user_id , req.body.quantity).then(([cart])=>{
           console.log("new insertion");
           return cart;
         }).then((r)=>{
              return res.redirect('/cart')
         }).catch(err=>err);
       }


    }).catch(err=>err);
}

exports.getCart = (req,res)=>{
    console.log(req.session.user_id);
    Cart.getCartProductsInfo(req.session.user_id).then(([products_list])=>{
       console.log(products_list);
       return res.render('cart',{
         title  : 'cart',
         products : products_list
       });
    }).catch(err=>err);
}

exports.deleteCart = (req,res)=>{
    const user_id = req.session.user_id;
    const p_id = req.body.productId;
    Cart.deletItemFromTheCart(user_id , p_id).then(([product])=>{
      res.redirect('/cart');
    }).catch(err=>err)
}
