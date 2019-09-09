const mysql = require('mysql');
let poolDb = mysql.createPool({
  host: '127.0.0.1', //数据库地址，在本机演示所以是127.0.0.1,默认端口3306
  user: 'root', //数据库用户名
  password: 'root', //数据库密码
  database: 'demo' //操作的数据库名称
});
const DB = {
  /**
   * @description sql语句执行函数
   * @param {String} sqlTpl sql语句比如select * from x where name=?
   * @param {Object} data 比如{name:'1212'}
   * @returns null  
   */
  query: (sqlTpl, data) => {
    return new Promise((resolve, reject) => {
      poolDb.getConnection((error, conn) => {
        if (!error) {
          conn.query(sqlTpl, data, (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(rows);
            }
            conn.release();
          })
        } else {
          console.log(err);
          reject(error);
        }
      });
    });
  },
};

module.exports = DB;