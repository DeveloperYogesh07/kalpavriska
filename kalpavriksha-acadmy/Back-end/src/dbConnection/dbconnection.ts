import  { Connection, PoolConnection } from "mysql2";
import mysql = require("mysql2");
import { DB_PORT, DB_HOST, DB_USER, DB_PASS, MYSQL_DB } from "../config/config";

const pool = mysql.createPool({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: MYSQL_DB,
});

pool.getConnection((err: any, connection: PoolConnection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
    connection.release(); // Release the connection back to the pool
  }
});

const promisePool = pool.promise();
// console.log(promisePool);

export = promisePool;
