const db = require('../utils/database');

module.exports = class Products{

                  static getAvailableProducts(city){
                    return db.execute("Select p_id,p_name,p_price,p_description FROM Products WHERE Products.m_id IN (SELECT Warehouse.m_id FROM Warehouse WHERE w_city = ? ) ",[city]);
                  }
                  static fetchAll(){
                    return db.execute("SELECT p_id,p_name,p_price,p_description FROM Products");
                  }

                }
