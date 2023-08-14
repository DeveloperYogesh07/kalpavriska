import dbConnection from './dbConnection/dbconnection'; 
import ExpressApp from './app';
import CoustomRoutes from './Router/CoustomRoutes';

const expressApp = new ExpressApp();


class Server {
 static async start() {
  await dbConnection.connect(); // 
  await dbConnection.syncDatabase(); // 

  const sequelize = dbConnection.getSequelizeInstance(); // 
  sequelize.authenticate().then(() => {
    console.log('Database authenticated successfully.');
  }).catch(error => {
    console.error('Error authenticating to the database:', error);
  });

  const app = expressApp.getApp();
  app.use("/", CoustomRoutes.publicRoutes());
  app.use("/", CoustomRoutes.protectedRoutes());

  expressApp.startServer();
 }
}

Server.start();

