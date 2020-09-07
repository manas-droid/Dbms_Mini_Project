const db = require('../utils/database');
module.exports = class Cart{
    static insertValues(p_id,user_id,quantity){
        return db.execute('INSERT INTO cart (p_id , user_id , quantity) VALUES(?,?,?) ', [p_id,user_id,quantity]);
    }
    static existingPrimaryKey(p_id , user_id){
      return db.execute('SELECT p_id FROM cart WHERE p_id = ? AND user_id = ?' , [p_id,user_id]);
    }
    static updateCart(p_id , user_id,quantity){
      return db.execute('UPDATE cart SET quantity = ? WHERE p_id = ? AND user_id = ? ' , [quantity,p_id,user_id]);
    }
    static getCartProductsInfo(user_id){
      return db.execute('SELECT p_name,p_price,p_description,quantity FROM products INNER JOIN cart ON products.p_id = cart.p_id AND user_id = ?',[user_id]);
    }

}
