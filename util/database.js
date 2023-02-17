const mysql = require('mysql2');

const pool =  mysql.createPool({

    host: 'localhost',
    user: 'root',
    database: 'deleting-cart',
    password: 'PFH#23kgrw9'
})

module.exports = pool.promise();