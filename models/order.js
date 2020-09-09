const db = require('../utils/database');

module.exports = class Orders{

    static  insertOrdersFromCart(user_id){
      return db.execute('INSERT INTO orders SELECT cart.p_id ,cart.user_id  FROM cart WHERE cart.user_id = ? ',[user_id]);
    }
    static fetchAll(user_id){
      return db.execute('SELECT p_name,p_price FROM products INNER JOIN orders ON products.p_id = orders.p_id AND user_id = ?' ,[user_id]);
    }
    static getOrderProductsInfo(user_id){
      return db.execute('SELECT p_name,p_price FROM products INNER JOIN orders ON products.p_id = orders.p_id AND user_id = ?',[user_id]);
    }
}
