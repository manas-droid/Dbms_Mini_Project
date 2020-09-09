const Cart = require('../models/cart');


exports.postOrder = (req,res)=>{
  Cart.getCartProductsInfo(req.session.user_id).then(([output])=>{
    console.log("postOrder",output);

    res.render('orders',{
        products : output,
        title : 'order'
    })
  }).catch(err=>err);
}
