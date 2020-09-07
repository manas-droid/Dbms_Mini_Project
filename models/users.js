const db = require('../utils/database');



module.exports = class Users{
    constructor (name,email,address,state,city,zip,phone,password){
      this.name = name;
      this.email = email;
      this.address = address;
      this.state = state;
      this.city = city;
      this.zip = zip;
      this.phone = phone;
      this.password = password;
    }

    save(){

      return db.execute("INSERT INTO users (user_name,user_address,user_state,user_city,user_pincode,user_phone,user_email,user_password) VALUES (?,?,?,?,?,?,?,?) ",
      [this.name,this.address,this.state,this.city,this.zip,this.phone,this.email,this.password]);
  }

  static searchEmail(email){
    return db.execute("SELECT * FROM users WHERE users.user_email = ?",[email]);
  }

    static deleteById(){

    }
    static fetchAll(){

    }
    static getCityById(id){
      return db.execute('SELECT user_city FROM users WHERE user_id = ? ', [id]);
    }
}
