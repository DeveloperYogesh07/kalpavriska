
import { Sequelize } from 'sequelize';
import { DB_HOST, DB_USER, DB_PASS, MYSQL_DB } from '../config/config';

class DatabaseConnection {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(MYSQL_DB, DB_USER, DB_PASS, {
      host: DB_HOST,
      dialect: 'mysql',
      logging: true,
    });
  }
  /***
   * Establishes a connection to the database using the configured Sequelize instance.
   */
  
  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  /**
   * Synchronizes the database's schema with the defined models.
   * 
 */
  async syncDatabase() {
    try {
      await this.sequelize.sync();
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
}

const dbConnection = new DatabaseConnection(); 

export default dbConnection;

















// const sequelize = new Sequelize(MYSQL_DB, DB_USER, DB_PASS, {
//     host: DB_HOST,
//     dialect: 'mysql'
//   });



//   try { 
//       sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("mysql");


// const pool = mysql.createPool({
//   port: DB_PORT,
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASS,
//   database: MYSQL_DB,
// });

// pool.getConnection((err: any, connection: PoolConnection) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//   } else {
//     console.log("Connected to the database!");
//     connection.release(); // Release the connection back to the pool
//   }
// });

// const promisePool = pool.promise();
// // console.log(promisePool);

// export = sequelize;
