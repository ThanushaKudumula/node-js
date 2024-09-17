const mysql= require('mysql2/promise');
const conn=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'QWdfERTY$123',
  
})
module.exports=conn