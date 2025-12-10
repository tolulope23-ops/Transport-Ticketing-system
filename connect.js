const mysql = require('mysql2/promise');

const connPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'transportsystem',
    password: '2328',
    connectionLimit: 10
});

module.exports = {connPool};