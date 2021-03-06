const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');
const path = require('path');

const db = require('./utils/database');
const app = express();
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);


//routes
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

  const options = {
      host: 'localhost',
      port: 3306,
      password: 'password',
      database: 'dbms_project',
      user : 'root',
      schema: {
       tableName: 'sessions',
       columnNames: {
           session_id: 'session_id',
           expires: 'expires',
           data: 'data'
       }
   }
  };

app.use(session({
  secret : 'secret',
  resave : 'false',
  saveUninitialized : true,
  store : new MySqlStore(options)
})
);

app.use(express.static(path.join(__dirname,'public')));


//Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended : false}));

app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
})

app.set('view engine','ejs');

//Rendering pages

app.use(authRouter);
app.use(homeRouter);
app.use(cartRouter);
app.use(orderRouter);





app.listen('3000' , ()=>{
  console.log('Server port 3000');
});
