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
           Cart.getCartProductsInfo(req.session.user_id).then(([products_list])=>{
              console.log(products_list);
              return res.redirect('/cart');
           }).catch(err=>err);
         }).catch(err=>err);
       }
       else{
         
         Cart.insertValues(req.body.p_id , req.session.user_id , req.body.quantity).then(([cart])=>{
           console.log("new insertion");
           return cart;
         }).then((r)=>{
           Cart.getCartProductsInfo(req.session.user_id).then(([products_list])=>{
              console.log(products_list);
              return res.redirect('/cart');
           }).catch(err=>err)
         }).catch(err=>err);
       }
    }).catch(err=>err);

}

exports.getCart = (req,res)=>{
    res.send("<h1>HI <h1>");
}
