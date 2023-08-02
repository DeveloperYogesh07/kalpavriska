"use strict";
var mysql = require("mysql2");
var config_1 = require("../config/config");
var pool = mysql.createPool({
    port: config_1.DB_PORT,
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASS,
    database: config_1.MYSQL_DB,
});
pool.getConnection(function (err, connection) {
    if (err) {
        console.error("Error connecting to the database:", err);
    }
    else {
        console.log("Connected to the database!");
        connection.release(); // Release the connection back to the pool
    }
});
var promisePool = pool.promise();
module.exports = promisePool;
//# sourceMappingURL=dbconnection.js.map